import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { resetPassword, searchUser } from '../../interfaces/registros';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-recover-code',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule, InputOtpModule, ToastModule, RippleModule ],
  templateUrl: './recover-code.component.html',
  styleUrl: './recover-code.component.scss',
  providers: [MessageService]
})
export class RecoverCodeComponent implements OnInit {

  codigo : any;

  valor ={
    email: ''
  }

  usuario = {
    user: '',
    code: ''
  }

  urlActual: string = '';

  email: string | null = '';
  errorCode: string = '';

  loading: boolean = true;
  statusBtn: string = 'Verificar Código';

  constructor(private service: NlrservicesService,  private cookie: CookieService, private router: Router, private routeActivate: ActivatedRoute, private message: MessageService){

    if(this.cookie.check('token_session')){

      if (this.cookie.check('url_anterior')){
        const urlAnterior = this.cookie.get('url_anterior');
        this.router.navigateByUrl(`${urlAnterior}`);
      }
      
    } else if (!this.cookie.check('email_verificacion')){

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

  enviarCorreo(){
    if (this.loading === true){
      this.loading = !this.loading;
      this.statusBtn = 'Enviando Código';
      this.service.sendEmail(this.valor as resetPassword).subscribe({
        next: (res: any) =>{
          console.log(res);
          this.notificationExito();
        },
        error: (err: any) => {
          console.log(err.error.message);
          this.errorCode = err.error.message;
          this.notificationError();
        }
      });
    }
    
  }

  /* Buscar usuario */
  buscarUser(credentials: string){
    this.service.showUser(credentials as unknown as searchUser).subscribe({
      next: (res: any) => {
        console.log(res);
        this.usuario.user = res.user;
        this.usuario.code = res.code_segurity;
      },
      error: (err: any) => {
        console.log(err.error.message);

      }
    });
  }

  /* Extraer de la Cookie */
  getCookie(){
    const valor = this.cookie.get('id_verificacion');
    this.valor.email = this.cookie.get('email_verificacion');
    /* this.buscarUser(valor); */
    this.buscarUser('3');
  }

  /* Extraer de la Cookie */
  setCookie(credentials_url: string){
    this.cookie.set('url_anterior', credentials_url);
    this.cookie.set('success_code_segurity', 'approved');
  }

  /* Verificar si el codigo introducido por el usuario es correcto */
  verificarCode(){

    setTimeout(() =>{

      if (this.codigo === this.usuario.code){
        console.log('codigo correcto');
        this.actualUrl();
        this.setCookie(this.urlActual);
        this.router.navigateByUrl('recoverp');
      } else {
        this.statusBtn = 'Verificar Código';
        this.loading = !this.loading;
        this.errorCode = 'El codigo que ha ingresado es incorrecto, verifica que el codigo enviado al correo sea el mismo que introduciste';
        this.notificationError();
      }
    }, 3000)

    this.loading = !this.loading;
    this.statusBtn = 'Verificando...';
  }

  /* Obtener la url actual */
  actualUrl(){
    this.routeActivate.url.subscribe(obtUrl => {
      this.urlActual = obtUrl.map(segment => segment.path).join('/');
    });
  }
  
  /* Notificar algun error */
  notificationError(){
    this.message.add({ severity: 'error', summary: 'Error', detail: `${this.errorCode}`, key: 'bl', life: 3000 });
  }
  
  /* Notificar algun error, advertencia o exito */
  notificationExito(){
    this.message.add({ severity: 'success', summary: 'Código Enviado', detail: 'Se ha enviado con exito el código de verificacion a su correo. Verifique e ingrese el código', key: 'bl', life: 3000 });
  }
}
