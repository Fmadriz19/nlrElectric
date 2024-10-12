import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { ProductsGeneral, searchUser, Users } from '../../interfaces/registros';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';

import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, NgClass, NgIf, NgFor, SkeletonModule, TabViewModule, SplitButtonModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [MessageService],
  animations: [
    trigger('yourAnimationTrigger', [
        state('open', style({
            opacity: 1,
            transform: 'translateY(0)'
        })),
        state('closed', style({
            opacity: 0,
            transform: 'translateY(-100%)'
        })),
        transition('open <=> closed', [
            animate('300ms ease-in-out')
        ])
    ])
]
})
export class UserListComponent implements OnInit {
  
  sidebarOpen = false;
  personal: string = '';
  personal_perfil: string = '';
  total_users: number = 0; // total de usuarios
  total_products: number = 0; // total de productos
  pag_actual: number = 1; // pagina actual
  pagination: number = 10; // usuarios permitidos por paginas
  unidades_stock: number = 0; // unidades en stock

  // Variable booleanas
  avatarMenu: boolean = false;
  darkMode: boolean = false;
  sessionAct: boolean = false;
  permisos: boolean = false;
  visibleUser: boolean = true;
  visibleProduct: boolean = false;
  visibleService: boolean = false;


  // Antiguo dashboard
  usuarios: Users[] = [];
  productsGeneral: ProductsGeneral[] = [];
  products: any[];
  url: string = '';
  selectedProductId: number = 0;
  selectedUserId: number = 0;
  selectedServiceId: number = 0;
  items: MenuItem[];
  itemsUser: MenuItem[];

  // variable booleanas
  skeleton: boolean = true;
  skeletonProduct: boolean = true;

  constructor(private nlrservice: NlrservicesService, private cookie: CookieService, private router: Router, private routerActivate: ActivatedRoute, private message: MessageService){
    this.products = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);

    this.items = [  
      {
          label: 'Eliminar',
          command: () => {
              this.delete(this.selectedProductId); // Pasa el ID del producto
          }
      }
    ];

    this.itemsUser = [  
      {
          label: 'Eliminar',
          command: () => {
              this.deleteUser(this.selectedUserId); // Pasa el ID del usuario
          }
      }
    ];
  }
  
  ngOnInit(): void {

    const theme = localStorage.getItem('theme');
    if (theme === 'dark'){
      document.documentElement.classList.add('dark');
      this.darkMode = !this.darkMode;
    } else {
      this.darkMode = false;
    }

    this.getCookie();
    this.getProducts();
    this.getUsers();
  }

  /* ---  Funcionalidades global del dashboard  --- */

  onDropdownClick(event: number) {
    if (this.visibleUser === true){
      this.selectedUserId = event;
    } else if (this.visibleProduct === true){
      this.selectedProductId = event;
    } else if (this.visibleService === true) {
      this.selectedServiceId = event;
    }
    
  }

  /* ---  Apartado de lista de usuarios  --- */

  // enviar a edicion de usuario
  editar(credentials: string){
    console.log(credentials);
    this.cookie.set('editar_id', credentials);
    this.actualurl();
    this.router.navigateByUrl('edit/user');
  }

  // enviar a creacion de usuario
  nuevoUsuario(){
    this.actualurl();
    this.router.navigateByUrl('registre/user');
  }

  // Todos los usuarios
  getUsers(){
    this.nlrservice.indexUsers(this.usuarios as unknown as Users).subscribe({
      next: (res: any) => {
        this.skeleton = !this.skeleton;
        this.usuarios = res;
        this.total_users = this.usuarios.length;
      }, 
      error: (err: any) => {
        console.log(err.error.message);
        
      }
    });
  }

  // obtener url actual
  actualurl(){
    this.routerActivate.url.subscribe(obtUrl => {
      this.url = obtUrl.map(segment => segment.path).join('/list');
    });

    this.cookie.set('url_anterior', this.url);
  }

  //eliminar usuario
  eliminar(credentials: string){
    this.nlrservice.deleteUser(credentials as unknown as searchUser).subscribe({
      next: (res) => {
        console.log(res);
        this.exito(res);
      }, 
      error: (err) => {
        console.log(err.error.message);
        
      }
    });
    
  }

  // Mostrar la cantidad de usuarios permitido por la paginacion
  getUsersPag(): any[]{
    const inicio = (this.pag_actual - 1) * this.pagination;
    return this.usuarios.slice(inicio, inicio + this.pagination);
  }

  updateUser(credentials: number){
    console.log(`actualizar usuario: ${credentials}`);
    
  }
  
  deleteUser(credentials: number){
    console.log(`eliminar usuario: ${credentials}`);
    
  }

  /* ---  Apartado de lista de Productos  --- */

  nuevoProducto(){
    this.actualurl();
    this.router.navigateByUrl('registre/products');
  }

  getProducts(){
    this.nlrservice.indexProducts(this.productsGeneral as unknown as ProductsGeneral).subscribe({
      next: (res) => {
        
        this.skeletonProduct = !this.skeletonProduct;
        // Crear un nuevo array con la propiedad showFullDescription
        this.productsGeneral = res.map((product: ProductsGeneral) => ({
          ...product, // Copia todas las propiedades del producto original
          showFullDescription: false // Agrega la nueva propiedad
        }));
        console.log(this.productsGeneral);

        this.total_products = this.productsGeneral.length;

        this.resultStock();

      },
      error: (err) => {
        console.log(err.error.message);
        
      }
    })
  }

  toggleDescription(product: ProductsGeneral) {
    product.showFullDescription = !product.showFullDescription;
  }


  resultStock(): number {

    const suma: number = this.productsGeneral.reduce((acc, producto) => {
        return acc + Number(producto.stock); 
    }, 0); 

    return this.unidades_stock = suma; 
}


  getProductsPag(): any[]{
    const inicio = (this.pag_actual - 1) * this.pagination;
    return this.productsGeneral.slice(inicio, inicio + this.pagination);
  }



  update(credentials: number){
    console.log(`actualizar: ${credentials}`);
    
  }
  
  delete(credentials: number){
    console.log(`eliminar: ${credentials}`);
    
  }

  /* ---  Apartado de lista de Servicios  --- */


  /* ---  Apartado de lista de Compras  --- */
  
  /* ---  Apartado de lista de Pedidos  --- */
  
  /* ---  Menu Dashboard  --- */
  
  selectUser(){
    this.visibleUser = true;
    this.visibleService = false;
    this.visibleProduct = false;
    this.pag_actual = 1;
  }
  
  selectProduct(){
    this.visibleUser = false;
    this.visibleService = false;
    this.visibleProduct = true;
    this.pag_actual = 1;
  }

  /* ---  Funcionalidad del pie de pagina   --- */

  nextPag(pagina: number){
    this.pag_actual = pagina;
  }

  totalPag(): number{

    let valor: number = 0;

    if (this.visibleUser === true){
      valor = Math.ceil(this.total_users / this.pagination);
    }
    else if (this.visibleProduct === true){
      valor = Math.ceil(this.total_products / this.pagination);
    }

    return valor;
  }

  rangoUsuarios(): { inicio: number; fin: number } {

    let inicio: number = 0;
    let fin: number = 0;

    if (this.visibleUser === true){
      inicio = (this.pag_actual - 1) * this.pagination + 1;
      fin = Math.min(this.pag_actual * this.pagination, this.total_users);
    }
    else if (this.visibleProduct === true){
      inicio = (this.pag_actual - 1) * this.pagination + 1;
      fin = Math.min(this.pag_actual * this.pagination, this.total_products);
    }    

    return { inicio, fin };
  }

  /* ---  Navbar  --- */
  modeDark(){
    this.darkMode = !this.darkMode;

    if (this.darkMode){
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

  }

  visibleMenuAvatar(){
    this.avatarMenu = !this.avatarMenu;
  }

  getCookie(){
    this.sessionAct = true;
    this.personal = this.cookie.get('id_personal');
    this.buscarUsuario();
  }

  // buscar usuario
  buscarUsuario(){
    this.nlrservice.showUser(this.personal as unknown as searchUser).subscribe({
      next: (res: any) => {
        this.personal_perfil = res.user.slice(0, 2);
        console.log(this.personal_perfil);
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  // Cerrar Sesion
  cerrarSession(){
    console.log('se presiono el cierre de sesion'); 
    this.cookie.delete('token_session','/');
    this.cookie.delete('id_personal', '/');
    this.cookie.delete('rol_personal', '/');
    location.reload();
  }

  // Mensajes
  exito(credentials: any){
    this.message.add({severity: 'success', summary: 'Petición Completada', detail: credentials});
  }
}
