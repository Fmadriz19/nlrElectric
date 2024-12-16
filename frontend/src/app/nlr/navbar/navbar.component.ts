import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NlrservicesService } from '../../services/nlrservices.service';
import { searchUser } from '../interfaces/registros';
import { BadgeModule } from 'primeng/badge';
import { CartShopService } from '../../services/cart-shop.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, BadgeModule, NgClass, FormsModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private cartSubscription!: Subscription;

  personal: string = '';
  personal_perfil: string = '';
  user = {
    name: '',
    email: ''
  }

  cartData: any [] = [];

  notificaciones_cart: number = 0;

  // Variable booleanas
  avatarMenu: boolean = false;
  darkMode: boolean = false;
  sessionAct: boolean = false;
  permisos: boolean = false;
  tooltipVisible: boolean = true;
  drawerVisible: boolean = false;

  constructor(private cookie: CookieService, private nlrServicios: NlrservicesService, private carrito: CartShopService) {
    this.updateNotificaciones();

    if(this.cookie.check('token_session')){
      this.sessionAct = !this.sessionAct;
      this.getCookie();
    }

    // Permisos de visibilidad de admin para el listado de productos y personas
    if (this.cookie.get('rol_personal') === 'admin'){
      this.permisos = !this.permisos;
    } else {
      this.permisos = false;
    }

  }

  ngOnInit(): void {
    // Escuchar los cambios en el carrito
    this.cartSubscription = this.carrito.getCartObservable().subscribe(() => {
      this.updateNotificaciones();
    });
    const theme = localStorage.getItem('theme');
    if (theme === 'dark'){
      document.documentElement.classList.add('dark');
      this.darkMode = !this.darkMode;
    } else {
      this.darkMode = false;
    }
  }

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
    this.personal = this.cookie.get('id_personal');
    this.buscarUsuario();
  }

  abrirDrawer(){
    this.drawerVisible = !this.drawerVisible;
  }

  updateNotificaciones(){
    const notificaciones = [...this.carrito.getCart(this.personal)];
    this.cartData = this.carrito.getCart(this.personal);
    this.notificaciones_cart = notificaciones.length;
  }

  eliminarCart($index: number){
  
    this.carrito.removeFromCart($index, this.personal);
    this.updateNotificaciones();
  }

  calcularTotal(): string {
    return this.cartData
      .reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)
      .toFixed(2); // Calcula el total
  }

  actualizarCantidad(productId: number, delta: number, inputValue?: number): void {
    const cart = this.carrito.getCart(this.personal);
    
    // Buscar el producto en el carrito
    const product = cart.find((item: any) => item.id === productId);
    if (!product) return;
  
    // Si el cambio viene del input, usar ese valor; de lo contrario, incrementar/disminuir
    if (inputValue !== undefined) {
      const parsedValue = parseInt(inputValue.toString(), 10);
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        product.quantity = parsedValue;
      } else {
        product.quantity = 1; // Valor mínimo
      }
    } else {
      product.quantity = Math.max(1, product.quantity + delta); // Evitar cantidades negativas
    }
  
    // Guardar en el localStorage
    this.carrito.saveCart(cart, this.personal);
  
    // Actualizar la vista
    this.updateNotificaciones();
  }
  

  // buscar usuario
  buscarUsuario(){
    this.nlrServicios.showUser(this.personal as unknown as searchUser).subscribe({
      next: (res: any) => {
        this.personal_perfil = res.user.slice(0, 2);
        this.user.name = res.name;
        this.user.email = res.email;
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
}
