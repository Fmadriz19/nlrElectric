import { Injectable } from '@angular/core';
import { loginRequest, resetPassword, searchUser, Userregistro, Users } from '../nlr/interfaces/registros';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NlrservicesService {

  url = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  resgistreUser(credentials: Userregistro): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/registre',credentials)
  }

  login(credentials: loginRequest): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/login',credentials)
  }

  sendEmail(credentials: resetPassword): Observable<any>{
    return this.http.post(`${this.url}/send`,credentials)
  }

  showUser(credentials: searchUser): Observable<any>{
    return this.http.get(`${this.url}/send/${credentials}`);
  }
}
