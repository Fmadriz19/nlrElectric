import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { resetPassword, searchUser } from '../../interfaces/registros';
import { Router } from '@angular/router';
import { InputOtpModule } from 'primeng/inputotp';
import { NlrjsonService } from '../../../services/nlrjson.service';

@Component({
  selector: 'app-recover-code',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule, InputOtpModule],
  templateUrl: './recover-code.component.html',
  styleUrl: './recover-code.component.scss'
})
export class RecoverCodeComponent implements OnInit {

  value : any

  valor ={
    email: ''
  }

  usuario = {
    user: '',
    code: ''
  }

  code_segurity: string | any = '';
  email: string | null = '';
  idUser: string | null = '';
  errorCode: string = '';

  constructor(private service: NlrservicesService, private router: Router, private getemail: NlrjsonService){
    this.email = this.getemail.getEmail();
    this.idUser = this.getemail.getId();
    this.buscarUser();
  }

  ngOnInit(): void {

  }

  enviarCorreo(){
    this.service.sendEmail(this.valor as resetPassword).subscribe({
      next: (res: any) =>{
        console.log(res);
        this.router.navigateByUrl('recoverc');
      },
      error: (err: any) => {
        console.log(err.error.message);
        this.errorCode = err.error.message;
      }
    });
  }

  buscarUser(){
    this.service.showUser(this.idUser as unknown as searchUser).subscribe({
      next: (res: any) => {
        this.usuario = res;
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    });
  }
}
