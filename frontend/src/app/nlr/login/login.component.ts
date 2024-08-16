import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NlrservicesService } from '../../services/nlrservices.service';
import { loginRequest } from '../interfaces/registros';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FloatLabelModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  inforLogin = {
    email: '',
    password: ''
  }

  Error = {
    email: '',
    password: ''
  }

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

  login() {
    this.services.login(this.inforLogin as loginRequest).subscribe({
      next: (data) => {
        console.log(data);
        //this.router.navigateByUrl('login');
      },
      error: (err) => {
        console.log(err.error.errors);
        this.Error = err.error.errors;
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

  mostrarError(){
    console.log(this.Error);
  }

}
