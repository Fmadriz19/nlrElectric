import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NlrjsonService {
  @Output() guardarvalor: EventEmitter<any> = new EventEmitter();
  
  private email: string | null = null;
  private id: string | null = null;

  constructor() { }

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string | null {
    return this.email;
  }

  clearEmail() {
    this.email = null;
  }

  /* Id del usuario que intenta recuperar la contraseña */
  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  clearId() {
    this.id = null;
  }

}
