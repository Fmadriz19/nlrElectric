import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { errors } from 'playwright';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {

  url: string = 'https://pydolarve.org/';
  api: string = 'http://127.0.0.1:8000/api';

  tasa = {
    tasabcv: ''
  };


  constructor(private http: HttpClient) { }

  getTasa(): Observable <any>{

    return this.http.get(`${this.api}/view/tasa`);
    /* this.http.get(`${this.api}/view/tasa`).subscribe({
      next: (res: any) => {
        this.tasa.tasabcv = res.tasabcv;
        
      },

      error: (err: any) => {
        console.error(err.error.message);
        
      }
    }); */
    
  }
  
  async getBCV(){
    this.http.get(`${this.url}api/v1/dollar?page=criptodolar&monitor=bcv&format_date=default`).subscribe({
      next: (res: any) => {
        this.tasa.tasabcv = res.price;        
      },
      error: (err: any) => {
        console.error(err.error.message);
        
      }
    });
  }

  async getApi(){
    await this.getBCV();

    this.http.put(`${this.api}/update/tasa`, this.tasa).subscribe({
      next: (res: any) => {
        console.log(res);
        
      }, 
      error: (err: any) => {
        console.error(err.message);
        
      }
    });
  }

  conversion(credentials: number): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log(credentials);
  
      this.getTasa().subscribe({
        next: (res: any) => {

          const valor: number = Number(credentials);
          const conver = valor * res[0].tasabcv;
          
          return resolve(conver.toString());
        },
        error: (err: any) => {
          console.error(err.error.message);
          
        }
        
      })
    });

    /* this.http.get(`${this.url}api/v1/dollar/conversion?type=USD&value=${credentials}&page=bcv&monitor=usd`).subscribe({
      next: res => {
        console.log(res);
        return res.toString;
        
      },
      error: err => {
        console.error(err);
        return err.error;
      }
    }); */
  }

  setConversion(numero: number){
    return Promise.resolve(this.conversion(numero));
  }
 
}
