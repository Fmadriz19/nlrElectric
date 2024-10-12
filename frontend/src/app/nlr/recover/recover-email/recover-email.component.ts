import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { resetPassword } from '../../interfaces/registros';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-recover-email',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule, ToastModule, RippleModule],
  templateUrl: './recover-email.component.html',
  styleUrl: './recover-email.component.scss',
  providers: [MessageService]
})
export class RecoverEmailComponent implements OnInit {

  valor ={
    email: ''
  }

  urlActual: string = '';

  email: string = '';
  errorEmail: string = '';

  statusBtn: string = 'Solicitar Código';
  loading: boolean = true;

  constructor(private service: NlrservicesService, private cookie: CookieService, private router: Router, private routeActivate: ActivatedRoute, private message: MessageService){

    if(this.cookie.check('sesion_activa')){
      if (this.cookie.check('url_anterior')){
        const urlAnterior = this.cookie.get('url_anterior');
        this.router.navigateByUrl(`${urlAnterior}`);
      }
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    
  }

  enviarCorreo(){
    // Bloquea el boton para no se haga nada mientras se envia el correo
    this.loading = !this.loading;
    this.statusBtn = 'Enviando...'; 

    this.service.sendEmail(this.valor as resetPassword).subscribe({
      next: (res: any) =>{
        console.log(res);
        this.actualUrl();
        this.setCookie(res.id, res.email, this.urlActual);
        this.router.navigateByUrl('recoverc');
      },
      error: (err: any) => {
        console.log(err.error.message);
        this.errorEmail = err.error.message;
        this.loading = !this.loading;
        this.statusBtn = 'Solicitar Código'; 
        this.notification();
      }
    });
  }

  /* Añadir a la Cookie */
  setCookie(credentials_id: string, credentials_email: string, credentials_url: string){
    this.cookie.set('id_verificacion', credentials_id);
    this.cookie.set('email_verificacion', credentials_email);
    this.cookie.set('url_anterior', credentials_url);
  }

  /* Obtener la url actual */
  actualUrl(){
    this.routeActivate.url.subscribe(obtUrl => {
      this.urlActual = obtUrl.map(segment => segment.path).join('/');
    });
  }

  /* Notificar algun error, advertencia o exito */
  notification(){
    this.message.add({ severity: 'error', summary: 'Error', detail: `${this.errorEmail}`, key: 'bl', life: 3000 });
  }
}
