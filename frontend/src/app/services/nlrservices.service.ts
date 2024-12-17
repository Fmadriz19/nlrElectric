import { Injectable } from '@angular/core';
import { Factura_Producto, loginRequest, passwordReset, Products, ProductsGeneral, resetPassword, searchService, searchUser, Servicios, ServiciosGeneral, Userregistro, Users } from '../nlr/interfaces/registros';
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
  indexUsers(): Observable<any>{
    return this.http.get(`${this.url}/view`);
  }

  // Buscar un Usuario
  showUser(credentials: searchUser): Observable<any>{
    return this.http.get(`${this.url}/search/${credentials}`);
  }
  
  // eliminar un Usuario
  deleteUser(credentials: searchUser): Observable<any>{
    return this.http.delete(`${this.url}/delete/${credentials}`);
  }

  // Actualizar Usuario
  updateUser(credentials: Userregistro, id: number): Observable<any>{
    return this.http.put(`${this.url}/update/${id}}`,credentials);
  }

  // Buscar un producto
  showProduct(credentials: ProductsGeneral): Observable<any>{
    return this.http.get(`${this.url}/show/product/${credentials}`);
  }

  // importar todos los productos
  indexProducts (): Observable<any>{
    return this.http.get(`${this.url}/view/product`);
  }

  // Actualizar Productos
  updateProduct(credentials: Products, id:number): Observable<any>{
    return this.http.put(`${this.url}/update/product/${id}`,credentials);
  }

  // Restaurar Contrasela de usuario
  restorePassword(credentials: passwordReset): Observable<any>{
    return this.http.post(`${this.url}/restaurarPass`, credentials);
  }

  // Extraer todos los servicios
  indexService(): Observable<any>{
    return this.http.get(`${this.url}/view/service`);
  }

  // Registrar Servicios
  registreService(credentials: ServiciosGeneral): Observable<any>{
    return this.http.post(`${this.url}/registre/service`,credentials);
  }

  // Buscar un servicio
  showService(credentials: searchService): Observable<any>{
    return this.http.get(`${this.url}/show/service/${credentials}`);
  }

  // Actualizar Servicios
  updateService(credentials: Servicios, id:number): Observable<any>{
    return this.http.put(`${this.url}/update/service/${id}`,credentials);
  }

  // Eliminar Servicios
  deleteService(credentials: searchService): Observable<any>{
    return this.http.delete(`${this.url}/delete/service/${credentials}`);
  }

  // Extrar todas las Facturas
  indexFacturas(): Observable<any>{
    return this.http.get(`${this.url}/view/factura`);
  }

  // Registrar Facturas
  registreFactura(credentials: Factura_Producto): Observable<any>{
    return this.http.post(`${this.url}/registre/factura`, credentials);
  }
}
