import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { searchProduct } from '../nlr/interfaces/registros';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  url = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) { }

  set_message(credentials: searchProduct) {
    return this.http.post(`${this.url}/productos?request=${credentials}`, credentials);
  }

  get_message() {
    return this.http.get(`${this.url}/view`);
  }
}
