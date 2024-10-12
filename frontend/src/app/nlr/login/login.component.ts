import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NlrservicesService } from '../../services/nlrservices.service';
import { cookielogin, loginRequest } from '../interfaces/registros';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FloatLabelModule, NgIf, NgClass, ToastModule, RippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {

  inforLogin = {
    email: '',
    password: ''
  }

  Error = {
    email: '',
    password: ''
  }

  statusBtn: string = 'Iniciar sesión';
  errorCredenciales: string = '';

  // Variable booleanas
  passwordPassSVG: boolean = true;
  confirPasswordSVG: boolean = true;
  confirPassword: boolean = false;
  passwordPass: boolean = false;
  loading: boolean = true;

  constructor(private message: MessageService, private services:NlrservicesService, private router: Router, private cookie: CookieService){

  }

  setCookie(credentials: cookielogin){
    this.cookie.set('token_session', credentials.token, 20);
    this.cookie.set('id_personal', credentials.id, 20);
    this.cookie.set('rol_personal', credentials.rol, 20);
  }

  login() {
    this.loading = !this.loading;

    this.services.login(this.inforLogin as loginRequest).subscribe({
      next: (data: any) => {
        console.log(data);
        this.setCookie(data);
        this.router.navigateByUrl('home'); //Cambiar a home
        location.reload();
      },
      error: (err: any) => {
        if (err.error.errors){
          console.log(err.error.errors);
          this.Error = err.error.errors;
          this.loading = !this.loading;
          this.statusBtn = 'Iniciar sesión';
        } else {
          this.errorCredenciales = err.error.message;
          console.log(this.errorCredenciales);
          
          this.loading = !this.loading;
          this.statusBtn = 'Iniciar sesión';
          this.notificationError();
        }
      }
    });
  }

  inputPass() {
    console.log('se presiono el ojo');
    this.passwordPassSVG = !this.passwordPassSVG;
    this.passwordPass = !this.passwordPass;
  }

  inputPassConfir(){
    console.log('se presiono el ojo');
    this.confirPasswordSVG = !this.confirPasswordSVG;
    this.confirPassword = !this.confirPassword;
  }

  /* Notificar algun error */
  notificationError(){
    this.message.add({ severity: 'error', summary: 'Error', detail: `${this.errorCredenciales}`, life: 3000 });
  } 

}
