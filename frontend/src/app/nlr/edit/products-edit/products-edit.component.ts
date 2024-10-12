import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-edit',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, ToastModule, FloatLabelModule],
  templateUrl: './products-edit.component.html',
  styleUrl: './products-edit.component.scss',
  providers: [MessageService]
})
export class ProductsEditComponent {
  
  inforProduct = {
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    img: '',
    marca: '',
    proveedor: ''

  }

  errores = {
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    img: '',
    marca: '',
    proveedor: ''
  }

  statusBtn: string = 'Registrar';
  // variables booleanas
  loading: boolean = true;
  peer_valid: boolean = false;
  mostrarModal: boolean = false;

  constructor(private cookie: CookieService, private servicenlr: NlrservicesService){

    if(this.cookie.check('token_session')){
      this.buscarUsuario();
    }
  }

  ngOnInit(): void {
    
  }

  // Extraer datos de las cookie
  getCookie(){
    this.cookie.get('id_personal');
  }

  // problemas del peer-valid
  verificarLongitud() {
    this.peer_valid = this.inforProduct.description.trim().length === 0;
  }

  // modal
  viewModal(){
    console.log('se presiono');
    
    this.mostrarModal = !this.mostrarModal;
  }

  //buscar usuario
  buscarUsuario(){
    
  }

  // registrar producto
  registre(){
    this.loading = !this.loading;
    
  }
}
