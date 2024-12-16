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
  loading: boolean = false;
  inputEmail: boolean = false;
  inputPassword: boolean = false;
  validado: boolean = true;

  constructor(private message: MessageService, private services:NlrservicesService, private router: Router, private cookie: CookieService){

  }

  setCookie(credentials: cookielogin){
    this.cookie.set('token_session', credentials.token, 20);
    this.cookie.set('id_personal', credentials.id, 20);
    this.cookie.set('rol_personal', credentials.rol, 20);
  }

  login() {
    this.loading = !this.loading;
    this.validado = !this.validado;
    this.statusBtn = 'Cargando...';
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
          this.validado = !this.validado;

        } else {
          this.errorCredenciales = err.error.message;
          console.log(this.errorCredenciales);
          this.validado = !this.validado;

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

  focusEmail() {
    const valor = this.inforLogin.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|edu\.ve|net)$/;

    if (valor === '') {
        this.Error.email = 'El campo no puede quedar vacío, ingrese un valor válido.';
        this.inputEmail = false;
        this.validarCampos();
        return;
    } else if (!emailRegex.test(valor)) {
        this.Error.email = 'El correo electrónico debe contener una dirección de correo como: @gmail.com, @hotmail.com, @ujap.edu.ve, etc.';
        this.inputEmail = false;
        this.validarCampos();
        return;
    } else {
      
      this.Error.email = '';
      this.inputEmail = true;
      this.validarCampos();
  }
}

  focusPassword(){
    const valor = this.inforLogin.password.trim();
    if (valor === '') {
      this.Error.password = 'El campo no puede quedar vacio, Ingrese un valor valido.' 
      this.inputPassword = false;
      this.validarCampos();       
      return;
    }
    
    else{
      this.Error.password = ''    
      this.inputPassword = true;
      this.validarCampos();     
    }
  }

  validarCampos(){
    if ((this.inputEmail) && (this.inputPassword)){
      this.validado = false;
    } else {
      this.statusBtn = 'Iniciar sesión';
      this.validado = true;
    }
  }

  /* Notificar algun error */
  notificationError(){
    this.message.add({ severity: 'error', summary: 'Error', detail: `${this.errorCredenciales}`, life: 3000 });
  } 

}
