import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { Userregistro } from '../../interfaces/registros';
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

  passwordPassSVG: boolean = true;
  confirPasswordSVG: boolean = true;
  confirPassword: boolean = false;
  passwordPass: boolean = false;
  loading: boolean = false;

  constructor(private elementeRef: ElementRef, private services:NlrservicesService, private router: Router){
    
  }
  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

  registre() {
    console.log(this.inforUser);
    this.services.resgistreUser(this.inforUser as Userregistro).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('login');
      },
      error: (err) => {
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

  mostrarError(){
    console.log(this.error);
  }
}
