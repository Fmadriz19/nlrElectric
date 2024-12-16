import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartShopService {
  private cartKey = 'cart';
  private cartSubject = new BehaviorSubject<any[]>([]); // Observable que emite los cambios del carrito.

  constructor() {}

  addToCart(product: any, id: string) {
    const cart = this.getCart(id);
    const existingProduct = cart.find((item: any) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Incrementar cantidad si ya existe
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    this.saveCart(cart, id);
  }

  getCart(id: string) {
    const cart = localStorage.getItem(this.cartKey + '/' + id);
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart: any, id: string) {
    localStorage.setItem(this.cartKey + '/' + id, JSON.stringify(cart));
    this.cartSubject.next(cart); // Emitir los cambios del carrito.
  }

  removeFromCart(productId: number, id: string) {
    const cart = this.getCart(id).filter((item: any) => item.id !== productId);
    this.saveCart(cart, id);
  }

  getCartObservable() {
    return this.cartSubject.asObservable(); // Exponer el Observable para que otros componentes lo escuchen.
  }

}



