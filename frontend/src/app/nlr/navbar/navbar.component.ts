import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NlrservicesService } from '../../services/nlrservices.service';
import { searchUser } from '../interfaces/registros';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  
  personal: string = '';
  personal_perfil: string = '';

  // Variable booleanas
  avatarMenu: boolean = false;
  darkMode: boolean = false;
  sessionAct: boolean = false;
  permisos: boolean = false;

  constructor(private cookie: CookieService, private nlrServicios: NlrservicesService) {

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

  // buscar usuario
  buscarUsuario(){
    this.nlrServicios.showUser(this.personal as unknown as searchUser).subscribe({
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
}
