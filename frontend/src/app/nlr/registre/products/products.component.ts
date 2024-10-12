import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Storage } from '@angular/fire/storage';
import { Products } from '../../interfaces/registros';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ProductsimgService } from '../../../services/productsimg.service';
import { Img } from '../../interfaces/files';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgClass, NgIf, ToastModule, FormsModule, FloatLabelModule, DialogModule, ButtonModule, InputTextModule, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService]
})

export class ProductsComponent implements OnInit {

  inforProduct = {
    name: '',
    descripcion: '',
    price: '',
    stock: '',
    img: '',
    marca: '',
    proveedor: '',
    amperaje: '',
    voltaje: '',
    tipo: '',
    model: '',
    estado: ''
  }

  inforIMG = {
    file: new Blob(),
    name_ruta: '',
    name: ''
  }

  errores = {
    name: '',
    descripcion: '',
    price: '',
    stock: '',
    img: '',
    marca: '',
    proveedor: '',
    amperaje: '',
    voltaje: '',
    tipo: '',
    model: '',
    estado: ''
  }

  datosIMG: Img[] = [];

  //selectimg: string[] = []; // Array de imagenes
  selectimg: string = ''; // Array de imagenes

  numIMG: number = 0;

  statusBtn: string = 'Registrar';
  // variables booleanas
  loading: boolean = true;
  peer_valid: boolean = false;
  visible: boolean = false;
  visibleINPUT: boolean = true;

  constructor(private router: Router, private cookie: CookieService, private servicenlr: NlrservicesService, private storage: Storage, private message: MessageService, private serviceImg: ProductsimgService){

    
  }

  ngOnInit(): void {
    
  }

  // Modal
  showDialog() {
    this.visible = true;
  }

  // Extraer datos de las cookie
  getCookie(){
    this.cookie.get('id_personal');
  }

  // problemas del peer-valid
  verificarLongitud() {
    this.peer_valid = this.inforProduct.descripcion.trim().length === 0;
  }

  // imagen
  uploadImage($event: any){
    const file = $event.target.files[0];
    const formats = ['image/png', 'image/jpeg', 'image/jpg']; 

    if (formats.includes(file.type)){
      // referencia del sitio
      this.inforIMG.name_ruta = `nlr/productos/${this.inforProduct.name}_${file.name}`;
      this.inforIMG.file = file;
      this.inforIMG.name = file.name;

      
      this.datosIMG.push(this.inforIMG);
      this.selectimg = URL.createObjectURL(file);
      this.visibleINPUT = false;

      this.numIMG += 1;


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

  //buscar usuario
  buscarUsuario(){
    
  }

  eliminarIMG(){
    this.visibleINPUT = true;
  }

  // registrar producto

  async registre(){
    this.loading = !this.loading;
    this.statusBtn = 'Registrando...';

    const existe = await this.serviceImg.setFile(this.inforIMG as Img);

    if (existe === 'existe') {
      console.log(existe);
      
      this.errores.img = 'Ya existe una imagen con ese nombre';
      this.statusBtn = 'Registrar';
      this.loading = !this.loading;
    } else {

      this.serviceImg.setimg()
      .then(res =>{
        console.log(res);
        this.inforProduct.img = res;

        
        this.servicenlr.registreProduct(this.inforProduct as unknown as Products).subscribe({
          next: (res: any) => {
            this.loading = !this.loading;
            this.statusBtn = 'Registrar';
            this.showDialog();

            this.inforProduct = {
              name: '',
              descripcion: '',
              price: '',
              stock: '',
              img: '',
              marca: '',
              proveedor: '',
              amperaje: '',
              voltaje: '',
              tipo: '',
              model: '',
              estado: ''
            };

            this.inforIMG.name = '';

            this.errores = {
              name: '',
              descripcion: '',
              price: '',
              stock: '',
              img: '',
              marca: '',
              proveedor: '',
              amperaje: '',
              voltaje: '',
              tipo: '',
              model: '',
              estado: ''
            }
            
            this.datosIMG = [];
            this.selectimg = '';
            this.visibleINPUT = true;
          }, 
          error: (err: any) => {
            this.loading = !this.loading;
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

  // Mensajes
  error() {
    this.message.add({ severity: 'error', summary: 'Formato de imagen no Permitido', detail: 'El formato de imagen que deseas subir no esta permitido. Solo se permiten ".JEPG .PNG .JPG"', life: 5000 });
  } 
}
