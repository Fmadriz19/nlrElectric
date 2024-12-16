import { NgClass, NgIf, CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { searchService, ServiciosGeneral, Userregistro } from '../../interfaces/registros';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { Img } from '../../interfaces/files';
import { ProductsimgService } from '../../../services/productsimg.service';
import { EditsService } from '../../../services/edits.service';
import { NlrservicesService } from '../../../services/nlrservices.service';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, ToastModule, FloatLabelModule, DialogModule, ButtonModule, InputTextareaModule, FileUploadModule, CommonModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.scss',
  providers: [MessageService, ConfirmationService]
})

export class ContactanosComponent implements OnInit {
  @Output() servicioUpdate = new EventEmitter<void>();

  inforService = {
    name: '',
    descripcion: '',
    telefono: '',
    email: '',
    asunto: ''
  }

  errores = {
    name: '',
    descripcion: '',
    telefono: '',
    email: '',
    asunto: ''
  }

  personal_perfil: string = '';
  statusBtn: string = 'Actualizar';

  // variables booleanas
  loading: boolean = true;
  peer_valid: boolean = false;
  visible: boolean = false;
  visibleINPUT: boolean = true;

  // Validaciones de inputs
  inputName: boolean = false;
  inputEjecucion: boolean = false;
  inputDescripcion: boolean = false;
  inputAsunto: boolean = false;
  inputTelefono: boolean = false;
  inputEmail: boolean = false;
  validado: boolean = true;

  constructor(private cookie: CookieService, private servicenlr: NlrservicesService, private router: Router, private message: MessageService, private serviceImg: ProductsimgService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {

  }

  // Extraer datos de las cookie
  getCookie(){
    this.cookie.get('id_personal');
  }

  validarCampos(){
    if(!(this.inforService.name.trim() === '') && !(this.inforService.asunto.trim() === '') && !(this.inforService.descripcion.trim() === '') || !(this.inforService.email.trim() === '')){
      this.validado = false;
      console.log('valido');
      
    } else {
      
      this.validado = true
      console.log('no valido');
    }
  }

  validationTelefono($event: KeyboardEvent){
    const valor = this.inforService.telefono.trim();
    const char = String.fromCharCode($event.charCode); // Obtener el carácter ingresado
    const regex = /^\d{0,2}(,\d{0,1})?$/;
    const newValue = valor + char;

    
    if (valor === '' && char === ',') {
      $event.preventDefault();
      return;
    }
    
    if (!regex.test(newValue)) {
      $event.preventDefault(); // Evitar que se ingrese el carácter
    }
  }
  
  focusTelefono(){
    const valor = this.inforService.telefono.trim();
    if (valor === '') {
      console.log('vacio');
      this.errores.telefono = 'El campo no puede quedar vacio, Ingrese un valor valido.' 
      this.inputEjecucion = false;
      this.validarCampos();
      return;
    }
    else{
      this.errores.telefono = ''    
      this.inputEjecucion = true;      
      this.validarCampos();
    }
  }
  
  focusName(){
    const valor = this.inforService.name.trim();
    if (valor === '') {
      console.log('vacio');
      this.errores.name = 'El campo no puede quedar vacio, Ingrese un valor valido.' 
      this.inputName = false;
      this.validarCampos();       
      return;
    }
    else{
      this.errores.name = ''    
      this.inputName = true;
      this.validarCampos();     
    }
  }
  
  focusAsunto(){
    const valor = this.inforService.asunto.trim();
    if (valor === '') {
      console.log('vacio');
      this.errores.asunto = 'El campo no puede quedar vacio, Ingrese un valor valido.' 
      this.inputName = false;
      this.validarCampos();       
      return;
    }
    else{
      this.errores.asunto = ''    
      this.inputName = true;
      this.validarCampos();     
    }
  }
  
  focusEmail(){
    const valor = this.inforService.email.trim();
    if (valor === '') {
      console.log('vacio');
      this.errores.email = 'El campo no puede quedar vacio, Ingrese un valor valido.' 
      this.inputName = false;
      this.validarCampos();       
      return;
    }
    else{
      this.errores.email = ''    
      this.inputName = true;
      this.validarCampos();     
    }
  }

  verificarLongitud(){
    const valor = this.inforService.descripcion.trim();
    if (valor === '') {
      console.log('vacio');
      this.errores.descripcion = 'El campo no puede quedar vacio, Ingrese un valor valido.' 
      this.inputDescripcion = false;
      this.validarCampos();             
      return;
    }
    else{
      this.errores.descripcion = ''    
      this.inputDescripcion = true;
      this.validarCampos();        
    }
  }

  enviar(){
    
  }

  // redireccionar
  redireccionar(){
    this.visible = !this.visible;
    this.router.navigateByUrl('home');
  }

  eliminarIMG(){
    this.visibleINPUT = true;
  }

  error(){
    this.message.add({ severity: 'warn', summary: 'Error de Solicitud', detail: 'Verificar que todos los campos cumpla lo requerido' });
  }

  exito(){
    this.message.add({ severity: 'success', summary: 'Servicio Actualizado', detail: 'El servicio se ha actualizado con exito, para visualizar los cambios cierre el modal para verificar' });
  }
}
