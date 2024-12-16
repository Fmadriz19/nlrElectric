import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Userregistro } from '../../interfaces/registros';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, ToastModule, FloatLabelModule, DialogModule, ButtonModule, InputTextModule ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
  providers: [MessageService]
})
export class NewUserComponent implements OnInit{
  @Output() userRegistered = new EventEmitter<void>();

  inforUser = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user: '',
    rol: ''
  }

  errores = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user: '',
    rol: ''
  }

  personal_perfil: string = '';
  statusBtn: string = 'Registrar';

  // variables booleanas
  loading: boolean = true;
  peer_valid: boolean = false;
  mostrarModal: boolean = false;
  confirPasswordSVG: boolean = true;
  passwordPassSVG: boolean = true;
  passwordPass: boolean = false;
  confirPassword: boolean = false;
  visible: boolean = false;

  constructor(private cookie: CookieService, private servicenlr: NlrservicesService, private router: Router, private message: MessageService){


  }

  ngOnInit(): void {
    
  }

  // Extraer datos de las cookie
  getCookie(){
    this.cookie.get('id_personal');
  }

  // modal
  viewModal(){
    console.log('se presiono');
    
    this.mostrarModal = !this.mostrarModal;
  }

  // cambiar de texto a password/viceversa
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
    this.cookie.delete('url_anterior', '/registre')
  }

  // registrar producto
  registre(){
    console.log(this.inforUser);
    
    this.loading = !this.loading;
    this.statusBtn = 'Registrando...';



    this.servicenlr.resgistreUser(this.inforUser as Userregistro).subscribe({
      next: (res: any) => {
        this.statusBtn = 'Registrar';
        this.loading = !this.loading;
        this.inforUser = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          user: '',
          rol: ''
        }
        this.userRegistered.emit();
      },
      error: (err: any) => {
        this.errores = err.error.errors;
        this.error();
        this.loading = !this.loading;
        this.statusBtn = 'Registrar';
      }
    })
    
  }

  error(){
    this.message.add({ severity: 'warn', summary: 'Error de Solicitud', detail: 'Verificar que todos los campos cumpla lo requerido' });
  }
}
