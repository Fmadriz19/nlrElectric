import { NgClass, NgIf, CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ServiciosGeneral, Userregistro } from '../../interfaces/registros';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { Img } from '../../interfaces/files';
import { ProductsimgService } from '../../../services/productsimg.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, ToastModule, FloatLabelModule, DialogModule, ButtonModule, InputTextareaModule, FileUploadModule, CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss',
  providers: [MessageService]
})
export class ServiciosComponent implements OnInit{
  @Output() servicioRegistered = new EventEmitter<void>();

  inforService = {
    name: '',
    descripcion: '',
    ejecucion: '',
    img: '',
  }

  errores = {
    name: '',
    descripcion: '',
    ejecucion: '',
    img: '',
  }

  inforIMG = {
    file: new Blob(),
    name_ruta: '',
    name: ''
  }

  datosIMG: Img[] = [];
  selectimg: string = ''; // Array de imagenes
  numIMG: number = 0;

  personal_perfil: string = '';
  statusBtn: string = 'Registrar';
  uploadedFiles: any[] = [];

  // variables booleanas
  loading: boolean = true;
  peer_valid: boolean = false;
  mostrarModal: boolean = false;
  confirPasswordSVG: boolean = true;
  passwordPassSVG: boolean = true;
  passwordPass: boolean = false;
  confirPassword: boolean = false;
  visible: boolean = false;
  visibleINPUT: boolean = true;

  // Validaciones de inputs
  inputName: boolean = false;
  inputEjecucion: boolean = false;
  inputDescripcion: boolean = false;
  validado: boolean = true;

  constructor(private cookie: CookieService, private servicenlr: NlrservicesService, private router: Router, private message: MessageService, private serviceImg: ProductsimgService) {
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

  validarCampos(){
    if(!(this.inforService.name.trim() === '') && !(this.inforService.ejecucion.trim() === '') && !(this.inforService.descripcion.trim() === '') && !(this.inforIMG.name_ruta.trim() === '')){
      this.validado = false;
      console.log('valido');
      
    } else {
      
      this.validado = true
      console.log('no valido');
    }
  }

  validationEjecucion($event: KeyboardEvent){
    const valor = this.inforService.ejecucion.trim();
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
  
  focusEjecucion(){
    const valor = this.inforService.ejecucion.trim();
    if (valor === '') {
      console.log('vacio');
      this.errores.ejecucion = 'El campo no puede quedar vacio, Ingrese un valor valido.' 
      this.inputEjecucion = false;
      this.validarCampos();
      return;
    }
    else{
      this.errores.ejecucion = ''    
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

  // imagen
  uploadImage($event: any){
    const file = $event.target.files[0];
    const formats = ['image/png', 'image/jpeg', 'image/jpg']; 

    if (formats.includes(file.type)){
      // referencia del sitio
      this.inforIMG.name_ruta = `nlr/servicios/${this.inforService.name}_${file.name}`;
      this.inforIMG.file = file;
      this.inforIMG.name = file.name;

      
      this.datosIMG.push(this.inforIMG);
      this.selectimg = URL.createObjectURL(file);
      this.visibleINPUT = false;

      this.numIMG += 1;
      this.validarCampos();

      console.log(this.datosIMG);
      
    } else {
      this.error();
    }
    
  }

  // redireccionar
  redireccionar(){
    this.visible = !this.visible;
    this.router.navigateByUrl('home');
  }

  eliminarIMG(){
    this.visibleINPUT = true;
  }

  // registrar producto

  async registre(){
    this.loading = !this.loading;
    this.validado =!this.validado;
    this.statusBtn = 'Registrando...';

    const existe = await this.serviceImg.setFileService(this.inforIMG as Img);

    if (existe === 'existe') {
      console.log(existe);
      
      this.errores.img = 'Ya existe una imagen con ese nombre';
      this.statusBtn = 'Registrar';
      this.loading = !this.loading;
      this.validado =!this.validado;

    } else {

      this.serviceImg.setimgService()
      .then(res =>{
        console.log(res);
        this.inforService.img = res;

        
        this.servicenlr.registreService(this.inforService as ServiciosGeneral).subscribe({
          next: (res: any) => {
            this.loading = !this.loading;
            this.validado =!this.validado;

            this.statusBtn = 'Registrar';
            this.inforService = {
              name: '',
              descripcion: '',
              ejecucion: '',
              img: '',
            };


            this.inforIMG.name = '';

            this.errores = {
              name: '',
              descripcion: '',
              ejecucion: '',
              img: '',
            }
            
            this.datosIMG = [];
            this.selectimg = '';
            this.visibleINPUT = true;

            this.servicioRegistered.emit();
          }, 
          error: (err: any) => {
            this.loading = !this.loading;
            this.validado =!this.validado;

            this.statusBtn = 'Registrar';
            this.errores = err.error.errors;          
          }
        })

      })
      .catch(err => {
        this.loading = !this.loading;

      }) 
    }
  

  }

  error(){
    this.message.add({ severity: 'warn', summary: 'Error de Solicitud', detail: 'Verificar que todos los campos cumpla lo requerido' });
  }
}
