import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { passwordReset } from '../../interfaces/registros';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-recover-pass',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule, ToastModule, RippleModule],
  templateUrl: './recover-pass.component.html',
  styleUrl: './recover-pass.component.scss',
  providers: [MessageService]
})
export class RecoverPassComponent implements OnInit {

  valor = {
    email: '',
    password: '',
    password_confirmation: ''
  }

  errorPass: string = '';
  statusBtn: string = 'Restablecer contraseña';

  // Variables booleanas
  passwordPassSVG: boolean = true;
  confirPasswordSVG: boolean = true;
  confirPassword: boolean = false;
  passwordPass: boolean = false;
  loading: boolean = true;

  constructor(private service: NlrservicesService, private cookie: CookieService, private router: Router, private message: MessageService){

    if(this.cookie.check('sesion_activa')){

      if (this.cookie.check('url_anterior')){
        const urlAnterior = this.cookie.get('url_anterior');
        this.router.navigateByUrl(`${urlAnterior}`);
      }
      
    } else if (!this.cookie.check('success_code_segurity')){

      if (this.cookie.check('url_anterior')){
        const urlAnterior = this.cookie.get('url_anterior');
        this.router.navigateByUrl(`${urlAnterior}`);
      }
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.getCookie();
  }

  /* Añadir a la Cookie */
  getCookie(){
    this.valor.email = this.cookie.get('email_verificacion');
  }

  restablecerPass(){
    this.loading = !this.loading;
    this.statusBtn = 'Restableciendo...';

    this.service.restorePassword(this.valor as passwordReset).subscribe({
      next: (res: any) => {
        console.log(res);
        this.notificationExito();
        setTimeout(() => {
          this.cookie.delete('email_verificacion');
          this.cookie.delete('success_code_segurity');
          this.cookie.delete('id_verificacion');
          this.router.navigateByUrl('login');
        }, 3000);
      },
      error: (err: any) => {
        this.errorPass = err.error.message;
        this.notificationError();
        this.loading = !this.loading;
        this.statusBtn = 'Restablecer contraseña'; 
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
    this.message.add({ severity: 'error', summary: 'Error', detail: `${this.errorPass}`, key: 'bl', life: 3000 });
  }
  
  /* Notificar algun error, advertencia o exito */
  notificationExito(){
    this.message.add({ severity: 'success', summary: 'Código Enviado', detail: 'Se ha cambiado con exito la contraseña. Inicie sesión para acceder a su cuenta', key: 'bl', life: 3000 });
  }
}
