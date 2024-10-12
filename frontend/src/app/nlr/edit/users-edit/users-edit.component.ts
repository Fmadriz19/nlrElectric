import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { searchUser } from '../../interfaces/registros';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, ToastModule, FloatLabelModule],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.scss',
  providers: [MessageService]
})
export class UsersEditComponent implements OnInit{

  inforProduct = {
    name: '',
    last_name: '',
    email: '',
    password: '',
    user: '',
    phone: '',
    adreess: '',
    img: '',
    rol: ''

  }

  errores = {
    name: '',
    last_name: '',
    email: '',
    password: '',
    user: '',
    phone: '',
    adreess: '',
    img: '',
    rol: ''
  }

  personal_perfil: string = '';
  statusBtn: string = 'Registrar';
  // variables booleanas
  loading: boolean = true;
  peer_valid: boolean = false;
  mostrarModal: boolean = false;

  constructor(private cookie: CookieService, private servicenlr: NlrservicesService, private router: Router){

    if(this.cookie.check('editar_id')){
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
    this.peer_valid = this.inforProduct.adreess.trim().length === 0;
  }

  // modal
  viewModal(){
    console.log('se presiono');
    
    this.mostrarModal = !this.mostrarModal;
  }

  // buscar usuario
  buscarUsuario(){
    const showid = this.cookie.get('editar_id');
    this.servicenlr.showUser(showid as unknown as searchUser).subscribe({
      next: (res: any) => {
        this.personal_perfil = res.user.slice(0, 2);
        this.inforProduct = res;
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  // registrar producto
  registre(){
    this.loading = !this.loading;
    
  }

  cancelar(){

    const url = this.cookie.get('url_anterior');
    this.cookie.delete('url_anterior', '/edit');
    this.cookie.delete('editar_id', '/edit');

    this.router.navigateByUrl(url);
  }
}
