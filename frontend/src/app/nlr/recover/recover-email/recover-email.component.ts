import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { resetPassword } from '../../interfaces/registros';
import { Router } from '@angular/router';
import { NlrjsonService } from '../../../services/nlrjson.service';

@Component({
  selector: 'app-recover-email',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass],
  templateUrl: './recover-email.component.html',
  styleUrl: './recover-email.component.scss'
})
export class RecoverEmailComponent {

  valor ={
    email: ''
  }

  email: string = '';
  errorEmail: string = '';

  constructor(private service: NlrservicesService, private router: Router, private setservice: NlrjsonService){

  }

  enviarCorreo(){
    this.service.sendEmail(this.valor as resetPassword).subscribe({
      next: (res: any) =>{
        console.log(res);
        this.setservice.setEmail(this.valor.email);
        this.setservice.setId(res.id);
        this.router.navigateByUrl('recoverc');
        
      },
      error: (err: any) => {
        console.log(err.error.message);
        this.errorEmail = err.error.message;
      }
    });
  }
}
