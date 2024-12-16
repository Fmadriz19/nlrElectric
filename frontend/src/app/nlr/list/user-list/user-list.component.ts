import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { Products, ProductsGeneral, searchService, searchUser, ServiciosGeneral, Users } from '../../interfaces/registros';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ProductsimgService } from '../../../services/productsimg.service';
import { Img } from '../../interfaces/files';
import { ToastModule } from 'primeng/toast';
import { NewUserComponent } from '../../registre/new-user/new-user.component';
import { ProductsComponent } from '../../registre/products/products.component';
import { ServiciosComponent } from '../../registre/servicios/servicios.component';
import { ServicesEditComponent } from '../../edit/services-edit/services-edit.component';
import { EditsService } from '../../../services/edits.service';
import { FacturaComponent } from '../../registre/factura/factura.component';
import { SearchPipe } from './search.pipe';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, NgClass, NgIf, NgFor, SkeletonModule, TabViewModule, SplitButtonModule, CommonModule, DialogModule, FormsModule, ConfirmDialogModule, ToastModule, NewUserComponent, ProductsComponent, ServiciosComponent, ServicesEditComponent, FacturaComponent, SearchPipe ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [MessageService, ConfirmationService],
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
  total_servicios: number = 0; // total de servicios
  pag_actual: number = 1; // pagina actual
  pagination: number = 10; // usuarios permitidos por paginas
  unidades_stock: number = 0; // unidades en stock
  statusBtn: string = 'Actualizar';
  id_update: number = 0;
  selectimg: string = ''; // Array de imagenes
  datosIMG: Img[] = [];
  numIMG: number = 0;
  titulo: string = 'Usuarios';
  searchText: string = '';

  inforUser = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user: '',
    rol: ''
  }

  inforProduct = {
    name: '',
    descripcion: '',
    price: 0,
    stock: 0,
    img: '',
    marca: '',
    proveedor: '',
    amperaje: '',
    voltaje: '',
    tipo: '',
    model: '',
    estado: ''
  }

  inforIMG = {
    file: new Blob(),
    name_ruta: '',
    name: ''
  }

  errores = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user: '',
    rol: ''
  }

  errores_product = {
    name: '',
    descripcion: '',
    price: '',
    stock: '',
    img: '',
    marca: '',
    proveedor: '',
    amperaje: '',
    voltaje: '',
    tipo: '',
    model: '',
    estado: ''
  }

  // Variable booleanas
  avatarMenu: boolean = false;
  darkMode: boolean = false;
  sessionAct: boolean = false;
  permisos: boolean = false;
  visibleUser: boolean = false; //cambiar a true
  visibleProduct: boolean = false;
  visibleService: boolean = false;
  visibleForms: boolean = false;
  visibleFormUser: boolean = false;
  visibleFormProduct: boolean = false;
  visibleFormServicio: boolean = false;
  visibleFormFactura: boolean = true;
  open: boolean = false;
  isDropdownVisible: boolean = false;
  visible: boolean = false;
  confirPasswordSVG: boolean = true;
  passwordPassSVG: boolean = true;
  passwordPass: boolean = false;
  confirPassword: boolean = false;
  loading: boolean = true;
  peer_valid: boolean = false;
  visibleINPUT: boolean = true;
  visiblePaneles: boolean = false; //cambiar a true
  barra_search: boolean = false;
  
  // Antiguo dashboard
  usuarios: Users[] = [];
  productsGeneral: ProductsGeneral[] = [];
  serviciosGeneral: ServiciosGeneral[] = [];
  products: any[];
  url: string = '';
  selectedProductId: number = 0;
  selectedUserId: number = 0;
  selectedServiceId: number = 0;
  items: MenuItem[];
  itemsUser: MenuItem[];
  itemsService: MenuItem[];

  // variable booleanas
  skeleton: boolean = true;
  skeletonProduct: boolean = true;

  constructor(private nlrservice: NlrservicesService, private cookie: CookieService, private router: Router, private routerActivate: ActivatedRoute, private message: MessageService, private serviceImg: ProductsimgService, private confirmationService: ConfirmationService, private serviceEdit: EditsService){
    this.products = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);

    this.items = [  
      {
          label: 'Eliminar',
          command: () => {
              this.delete(this.selectedProductId); // Pasa el ID del producto
          }
      }
    ];

    this.itemsService = [  
      {
          label: 'Eliminar',
          command: () => {
              this.deleteServicios(this.selectedServiceId); // Pasa el ID del producto
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
    this.getServices();
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

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
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
    this.nlrservice.indexUsers().subscribe({
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

  // editar usuario
  actualizarUser(){
    this.loading = !this.loading;
    this.statusBtn = 'Actualizando...';
    this.nlrservice.updateUser(this.inforUser, this.id_update).subscribe({
      next: (res: any) => {
        this.exito(res.message);
        this.visible = false;
        this.getUsers();
      },
      error: (err: any) => {
        this.errores = err.error.errors;
        console.log(err.error.message);
        this.loading = !this.loading;
        this.statusBtn = 'Actualizar';
      }
    });
  }

  inputPass(){
    this.passwordPassSVG = !this.passwordPassSVG;
    this.passwordPass = !this.passwordPass;
  }

  inputPassConfir(){
    this.confirPasswordSVG = !this.confirPasswordSVG;
    this.confirPassword = !this.confirPassword;
  }

  // cancelar registro
  cancelar(){
    this.visible = false;
  }

  //eliminar usuario
  /* eliminar(credentials: string){
    this.nlrservice.deleteUser(credentials as unknown as searchUser).subscribe({
      next: (res) => {
        console.log(res);
        this.exito(res);
      }, 
      error: (err) => {
        console.log(err.error.message);
        
      }
    });
    
  } */

  // Mostrar la cantidad de usuarios permitido por la paginacion
  getUsersPag(): any[]{
    const inicio = (this.pag_actual - 1) * this.pagination;
    return this.usuarios.slice(inicio, inicio + this.pagination);
  }

  updateUser(credentials: number){
    this.visible = true;
    this.id_update = credentials;
    this.nlrservice.showUser(credentials as unknown as searchUser).subscribe({
      next: (res) => {
        this.inforUser = res;
        console.log(this.inforUser);
      },
      error: (err) => {
        console.log(err.error.message);
        
      }
    });
  }
  
  deleteUser(credentials: number){
    console.log(`eliminar usuario: ${credentials}`);
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



  /* ---  Apartado de lista de Productos  --- */
  

  getProducts(){
    this.nlrservice.indexProducts().subscribe({
      next: (res) => {
        
        this.skeletonProduct = !this.skeletonProduct;
        // Crear un nuevo array con la propiedad showFullDescription
        this.productsGeneral = res.map((product: ProductsGeneral) => ({
          ...product, // Copia todas las propiedades del producto original
          showFullDescription: false // Agrega la nueva propiedad
        }));

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
  
  // imagen
  uploadImage($event: any){
    const file = $event.target.files[0];
    const formats = ['image/png', 'image/jpeg', 'image/jpg']; 
    
    if (formats.includes(file.type)){
      // referencia del sitio
      this.inforIMG.name_ruta = `nlr/productos/${this.inforProduct.name}_${file.name}`;
      this.inforIMG.file = file;
      this.inforIMG.name = file.name;
      
      
      this.datosIMG.push(this.inforIMG);
      this.selectimg = URL.createObjectURL(file);
      this.visibleINPUT = false;
      
      this.numIMG += 1;
      
      
      console.log(this.datosIMG);
      
    } else {
      this.error();
    }
    
  }
  
  eliminarIMG(){
    this.visibleINPUT = true;
  }
  
  // Actualizar Producto

  async actualizarProducto(){
    this.loading = !this.loading;
    this.statusBtn = 'Actualizando...';

    const existe = this.selectimg === this.inforProduct.img;
    if (existe) {
      console.log(existe);

      // Por si ya existe el archivo
      this.confirm1(event as unknown as Event);

    } else {

      this.serviceImg.setimg()
      .then(res =>{
        console.log(res);
        this.inforProduct.img = res;

        
        this.nlrservice.updateProduct(this.inforProduct, this.id_update).subscribe({
          next: (res: any) => {
            this.loading = !this.loading;
            this.statusBtn = 'Actualizar';

            this.inforProduct = {
              name: '',
              descripcion: '',
              price: 0,
              stock: 0,
              img: '',
              marca: '',
              proveedor: '',
              amperaje: '',
              voltaje: '',
              tipo: '',
              model: '',
              estado: ''
            };

            this.inforIMG.name = '';

            this.errores_product = {
              name: '',
              descripcion: '',
              price: '',
              stock: '',
              img: '',
              marca: '',
              proveedor: '',
              amperaje: '',
              voltaje: '',
              tipo: '',
              model: '',
              estado: ''
            }
            
            this.datosIMG = [];
            this.selectimg = '';
            this.visibleINPUT = true;
            this.getProducts();
          }, 
          error: (err: any) => {
            this.loading = !this.loading;
            this.statusBtn = 'Actualizar';
            this.errores = err.error.errors;          
          }
        })

      })
      .catch(err => {
        this.loading = !this.loading;

      }) 
    }
  
  }

  updateAlternativo(){
    this.nlrservice.updateProduct(this.inforProduct, this.id_update).subscribe({
      next: (res: any) => {
        this.loading = !this.loading;
        this.statusBtn = 'Actualizar';

        this.selectimg = '';
        this.visibleINPUT = true;
        this.getProducts();
      }, 
      error: (err: any) => {
        this.loading = !this.loading;
        this.statusBtn = 'Actualizar';
        this.errores = err.error.errors;
        console.error(err.error.message);
        
      }
    })
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'En la base de datos ya existe un archivo con ese nombre, ¿Deseas continuar con la actualizacion del producto sin cambiar el nombre del archivo?',
        header: 'Archivo Existente',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.message.add({ severity: 'info', summary: 'Actualizando...', detail: 'Aceptaste continuar con la actualizacion' });
            this.updateAlternativo();
        },
        reject: () => {
            this.message.add({ severity: 'error', summary: 'Detenido', detail: 'Actualizacion detenida por archivo existente', life: 3000 });
            this.errores_product.img = 'Ya existe una imagen con ese nombre';
            this.statusBtn = 'Actualizar';
            this.loading = !this.loading;
        }
    });
  }

  // Mensajes
  error() {
    this.message.add({ severity: 'error', summary: 'Formato de imagen no Permitido', detail: 'El formato de imagen que deseas subir no esta permitido. Solo se permiten ".JEPG .PNG .JPG"', life: 5000 });
  } 

  getProductsPag(): any[]{
    const inicio = (this.pag_actual - 1) * this.pagination;
    return this.productsGeneral.slice(inicio, inicio + this.pagination);
  }

  verificarLongitud() {
    this.peer_valid = this.inforProduct.descripcion.trim().length === 0;
  }


  update(credentials: number){
    this.visible = true;
    this.id_update = credentials;

    this.nlrservice.showProduct(credentials as unknown as ProductsGeneral).subscribe({
      next: (res: any) => {
        this.inforProduct = res;
        console.log(this.inforProduct);
        this.visibleINPUT = false;
        this.selectimg = this.inforProduct.img;
      },
      error: (err: any) => {
        console.log(err.error.message);
        
      }});
  }
  
  delete(credentials: number){
    console.log(`eliminar: ${credentials}`);  
  }

  /* ---  Apartado de lista de Servicios  --- */
  
  // Todos los sevicios
  getServices(){
    this.nlrservice.indexService(this.serviciosGeneral as unknown as ServiciosGeneral).subscribe({
      next: (res: any) => {
        this.skeleton = !this.skeleton;

        this.serviciosGeneral = res.map((product: ServiciosGeneral) => ({
          ...product, // Copia todas las propiedades del producto original
          showFullDescription: false // Agrega la nueva propiedad
        }));
        this.total_servicios = this.serviciosGeneral.length;
      }, 
      error: (err: any) => {
        console.log(err.error.message); 
      }
    });
  }

  ServiceDescription(product: ServiciosGeneral) {
    product.showFullDescription = !product.showFullDescription;
  }

  // Mostrar la cantidad de usuarios permitido por la paginacion
  getServicePag(): any[]{
    const inicio = (this.pag_actual - 1) * this.pagination;
    return this.serviciosGeneral.slice(inicio, inicio + this.pagination);
  }

  updateService(credentials: number){
    this.visible = true;
    this.serviceEdit.changeId(credentials)
    console.log(credentials);
  }
  
  deleteServicios(credentials: number){
    this.nlrservice.deleteService(credentials as unknown as searchService).subscribe({
      next: (res) => {
        console.log(res);
        this.exito(res.message);
        this.getServices();
      }, 
      error: (err) => {
        console.log(err.error.message);
        
      }
    });
  }


  /* ---  Apartado de lista de Facturas  --- */
  
  getFacturas(){
    this.nlrservice.indexFacturas().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    });
  }








  
  /* ---  Menu Dashboard  --- */
  
  selectUser(){
    this.visibleUser = true;
    this.visibleService = false;
    this.visibleProduct = false;
    this.visibleFormProduct = false;
    this.visibleFormUser = false;
    this.visibleFormServicio = false;
    this.visibleFormFactura = false;
    this.pag_actual = 1;
    this.visiblePaneles = true;
    this.titulo = 'Usuarios';
  }
  
  selectProduct(){
    this.visibleUser = false;
    this.visibleService = false;
    this.visibleProduct = true;
    this.visibleFormProduct = false;
    this.visibleFormUser = false;
    this.visibleFormServicio = false;
    this.visibleFormFactura = false;
    this.pag_actual = 1;
    this.visiblePaneles = false;

    this.titulo = 'Productos';
  }
  
  selectService(){
    this.visibleUser = false;
    this.visibleService = true;
    this.visibleProduct = false;
    this.visibleFormProduct = false;
    this.visibleFormUser = false;
    this.visibleFormServicio = false;
    this.visibleFormFactura = false;
    this.visiblePaneles = false;

    this.pag_actual = 1;

    this.titulo = 'Servicios';

  }

  selectUserForm(){
    this.visibleUser = false;
    this.visibleService = false;
    this.visibleProduct = false;
    this.visibleFormUser = true;
    this.visibleFormProduct = false;
    this.visibleFormServicio = false;
    this.visibleFormFactura = false;
    this.visiblePaneles = false;
    this.pag_actual = 1;

    this.titulo = 'Crear Usuario';

  }

  selectProductForm(){
    this.visibleUser = false;
    this.visibleService = false;
    this.visibleProduct = false;
    this.visibleFormUser = false;
    this.visibleFormProduct = true;
    this.visibleFormServicio = false;
    this.visibleFormFactura = false;
    this.visiblePaneles = false;
    this.pag_actual = 1;

    this.titulo = 'Crear Producto';
  }

  selectServiceForm(){
    this.visibleUser = false;
    this.visibleService = false;
    this.visibleProduct = false;
    this.visibleFormProduct = false;
    this.visibleFormUser = false;
    this.visibleFormServicio = true;
    this.visibleFormFactura = false;
    this.pag_actual = 1;
    this.visiblePaneles = false;

    this.titulo = 'Crear Servicio';
  }

  selectFacturaForm(){
    this.visibleUser = false;
    this.visibleService = false;
    this.visibleProduct = false;
    this.visibleFormProduct = false;
    this.visibleFormUser = false;
    this.visibleFormServicio = false;
    this.visibleFormFactura = true;
    this.pag_actual = 1;
    this.visiblePaneles = false;

    this.titulo = 'Crear Factura';
  }

  /* ---  Funcionalidad de los formularios   --- */
  closeFormUser(){}

  registrarUsuario(Event: Event){}
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
    else if (this.visibleService === true){
      inicio = (this.pag_actual - 1) * this.pagination + 1;
      fin = Math.min(this.pag_actual * this.pagination, this.total_servicios);
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
