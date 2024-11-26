import { Injectable } from '@angular/core';
import { loginRequest, passwordReset, Products, ProductsGeneral, resetPassword, searchUser, Userregistro, Users } from '../nlr/interfaces/registros';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NlrservicesService {

  url = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  // Registros de Usuario
  resgistreUser(credentials: Userregistro): Observable<any>{
    return this.http.post(`${this.url}/registre`,credentials);
  }

  // Registro de Productos
  registreProduct(credentials: Products): Observable<any>{
    return this.http.post(`${this.url}/registre/product`,credentials);
  }

  // Iniciar Sesión de un usuario
  login(credentials: loginRequest): Observable<any>{
    return this.http.post(`${this.url}/login`,credentials);
  }

  // Envios de Correos
  sendEmail(credentials: resetPassword): Observable<any>{
    return this.http.post(`${this.url}/send`,credentials);
  }

  // importar todos los usuarios
  indexUsers(credentials: Users): Observable<any>{
    return this.http.get(`${this.url}/view`);
  }

  // Buscar un Usuario
  showUser(credentials: searchUser): Observable<any>{
    return this.http.get(`${this.url}/search/${credentials}`);
  }
  
  // Buscar un Usuario
  deleteUser(credentials: searchUser): Observable<any>{
    return this.http.delete(`${this.url}/delete/${credentials}`);
  }

  // Buscar un producto
  showProduct(credentials: ProductsGeneral): Observable<any>{
    return this.http.get(`${this.url}/show/product/${credentials}`);
  }

  // importar todos los productos
  indexProducts (credentials: ProductsGeneral): Observable<any>{
    return this.http.get(`${this.url}/view/product`);
  }

  // Restaurar Contrasela de usuario
  restorePassword(credentials: passwordReset): Observable<any>{
    return this.http.post(`${this.url}/restaurarPass`, credentials);
  }

}
