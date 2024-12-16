import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { Userregistro, Users } from '../../interfaces/registros';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, FloatLabelModule, NgIf, NgClass],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  inforUser = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user: '',
    rol: 'cliente',
  };

  error = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user: '',
  };

  validaciones = {
    mayuscula: false,
    minuscula: false,
    numero: false,
    caracterEspecial: false,
    longitud: false,
  }

  usuarios: Users[] = [];

  statusBtn: string = 'Registrarse'
  passwordPassSVG: boolean = true;
  confirPasswordSVG: boolean = true;
  confirPassword: boolean = false;
  passwordPass: boolean = false;
  loading: boolean = true;

  inputName: boolean = false;
  inputEmail: boolean = false;
  inputUser: boolean = false;
  inputPassword: boolean = false;
  inputConfirPassword: boolean = false;
  validado: boolean = true;
  terms: boolean = false;

  constructor(private elementeRef: ElementRef, private services:NlrservicesService, private router: Router, private nlrService: NlrservicesService){
    this.indexUser();
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

  registre() {
    this.loading = !this.loading;
    this.validado = !this.validado;
    this.statusBtn = 'Cargando...';

    console.log(this.inforUser);
    this.services.resgistreUser(this.inforUser as Userregistro).subscribe({
      next: (data) => {
        this.loading = !this.loading;
        this.validado = !this.validado;
        this.statusBtn = 'Registrarse';
        console.log(data);
        this.router.navigateByUrl('login');
      },
      error: (err) => {
        this.loading = !this.loading;
        this.validado = !this.validado;
        this.statusBtn = 'Registrarse';
        console.log(err.error.errors);
        this.error = err.error.errors;
        this.mostrarError();
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

  ngAfterViewInit(){

  }

  // Extrar todos los usuarios
  indexUser(){
    this.nlrService.indexUsers().subscribe({
      next: (data:any) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  // Validaciones de los campos
  validateName(){
    const name = this.inforUser.name.trim();
    if (name === '') {
      this.error.name = 'El nombre es requerido';
      this.inputName = false;
      this.validadoCampos();
      return;
    } else if (name.length < 3 || name.length > 50) {
      this.error.name = 'El nombre debe tener entre 3 y 50 caracteres';
      this.inputName = false;
      this.validadoCampos();
      return;
    } else {
      this.error.name = '';
      this.inputName = true;
    }
  }

  validateEmail(){
    const email = this.inforUser.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|edu\.ve|net)$/;
    const existe = this.usuarios.find((usuario) => usuario.email === email);


    if (email === '') {
      this.error.email = 'El campo es requerido.';
      this.inputEmail = false;
      this.validadoCampos();
      return;
    }
    if (!emailRegex.test(email)) {
      this.error.email = 'El correo electrónico debe contener una dirección de correo como: @gmail.com, @hotmail.com, @ujap.edu.ve, etc.';
      this.inputEmail = false;
      this.validadoCampos();
      return;
    }
    if (existe) {
      this.error.email = `El correo ${email} ya existe`;
      this.inputEmail = false;
      this.validadoCampos();
      return;
    }
      
    this.error.email = '';
    this.inputEmail = true;
    this.validadoCampos();
  }

  validateUser(){
    const user = this.inforUser.user.trim();
    const existe = this.usuarios.find((usuario) => usuario.user === user);

    if (user === '') {
      this.error.user = 'El campos es requerido';
      this.inputUser = false;
      this.validadoCampos();
      return;
    } else if (user.length <   3) {
      this.error.user = 'El usuario debe tener mas de 3 caracteres';
      this.inputUser = false;
      this.validadoCampos();
      return;
    } else if (existe) {
      this.error.user = `El usuario ${user} ya existe`;
      this.inputUser = false;
      this.validadoCampos();
      return;
    } 
    else {
      this.error.user = '';
      this.inputUser = true;
    }
  }

  validatePassword(){
    const pass = this.inforUser.password.trim();

    if (pass === '') {
      this.error.password = 'El campo es requerido';
      this.inputPassword = false;
      this.validadoCampos();
      return;
    } else if (pass.length < 8) {
      this.error.password = 'La contraseña debe tener 8 caracteres';
      this.inputPassword = false;
      this.validadoCampos();
      return;
    } else {
      this.error.password = '';
      this.inputPassword = true;
    }
  }

  validateConfirPassword(){
    const pass = this.inforUser.password_confirmation.trim();

    if (pass === '') {
      this.error.password_confirmation = 'El campo es requerido';
      this.inputConfirPassword = false;
      this.validadoCampos();
      return;
    } else if (this.inforUser.password !== this.inforUser.password_confirmation) {
      this.error.password_confirmation = 'Las contraseñas no coinciden';
      this.inputConfirPassword = false;
      this.validadoCampos();
      return;
    } else {
      this.error.password_confirmation = '';
      this.inputConfirPassword = true;
    }
  }

  campoConfirPassword($event: KeyboardEvent){
    const char = String.fromCharCode($event.charCode);
    const newValue = this.inforUser.password_confirmation + char;
    this.inputConfirPassword = false;

    if (newValue === this.inforUser.password) {
      this.inputConfirPassword = true;
      this.error.password_confirmation = '';
    } else {
      this.inputConfirPassword = false; // No coinciden
      this.error.password_confirmation = 'Las contraseñas no coinciden';
    }

  console.log('¿Las contraseñas coinciden?', this.inputConfirPassword);
  }

  campoPassword($event: KeyboardEvent) {
    const char = String.fromCharCode($event.charCode);
    const newValue = this.inforUser.password + char;

    const passwordStrengthItem = document.getElementById('min-length');
    const checkIcon = document.getElementById('check-icon');
    const uncheckIcon = document.getElementById('uncheck-icon');  

    // Expresiones regulares para validar la contraseña
    const tieneMayuscula = /[A-Z]/.test(newValue);
    const tieneMinuscula = /[a-z]/.test(newValue);
    const tieneNumero = /\d/.test(newValue);
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(newValue);

    if (tieneMayuscula && tieneMinuscula && tieneNumero && tieneCaracterEspecial && newValue.length >= 8) {      
      this.inputPassword = true;
      this.validadoCampos();
    }

    if (tieneMinuscula){
      this.validaciones.minuscula = true;
      this.inputPassword = false;
    }

    if (tieneMayuscula){
      this.validaciones.mayuscula = true;
      this.inputPassword = false;
    }
    
    if (tieneNumero){
      this.validaciones.numero = true;
      this.inputPassword = false;
    }
    
    if (tieneCaracterEspecial){
      this.validaciones.caracterEspecial = true;
      this.inputPassword = false;
    }
    
    if (newValue.length >= 8){
      this.validaciones.longitud = true;
      this.inputPassword = false;

      passwordStrengthItem?.classList.add('strong-password-active:text-success');
      checkIcon?.classList.remove('hidden');
      uncheckIcon?.classList.add('hidden');
    }

    else {
      passwordStrengthItem?.classList.remove('strong-password-active:text-success');
      checkIcon?.classList.add('hidden');
      uncheckIcon?.classList.remove('hidden');
    }

  }

  validateTerms(event: Event){
    const checkbox = event.target as HTMLInputElement;
    this.terms = checkbox.checked;
    console.log('¿Términos aceptados?', this.terms);
    this.validadoCampos();
  }

  validadoCampos(){
    if ((this.inputName) && (this.inputEmail) && (this.inputUser) && (this.inputPassword) && (this.inputConfirPassword) && (this.terms)){
      this.validado = false;
      console.log('Se puede registrar');
    } else {
      console.error('No se puede registrar');
      this.validado = true;
    }
  }

  mostrarError(){
    console.log(this.error);
  }
}
