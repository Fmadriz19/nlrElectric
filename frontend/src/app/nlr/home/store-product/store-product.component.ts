import { Component, OnInit } from '@angular/core';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { Marcas, ProductsGeneral, searchUser } from '../../interfaces/registros';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-product',
  standalone: true,
  imports: [FormsModule, NgFor, SearchPipe],
  templateUrl: './store-product.component.html',
  styleUrl: './store-product.component.scss'
})
export class StoreProductComponent implements OnInit{

  // Variables

  generalProducts: ProductsGeneral[] = [];
  marcasProducts: Marcas[] = [];
  searchText: string = '';
  valor: string = '';
  // Variables booleanas

  constructor(private nlrservices: NlrservicesService, private cookie: CookieService, private router: Router){
    this.getProducts();
  }

  ngOnInit(): void {
    console.log(this.valor);
    
  }

  /*  Extrayendo todos los productos  */

  getProducts(){
    this.nlrservices.indexProducts(this.generalProducts as unknown as ProductsGeneral).subscribe({
      next: (res) =>{
        this.generalProducts = res;
        this.listadoMarca();
      },
      error: (err) => {
        console.log('error');
      }
    });
  }

  // Listado de marcas productos
  listadoMarca() {
    const marcasContadas: { [name: string]: number } = {};

    this.generalProducts.forEach(product => {

      const marca = product.marca; 
      if (marcasContadas[marca]) {
        marcasContadas[marca]++;
      } else {
        marcasContadas[marca] = 1;
      }
    });

    // Convertir el objeto a un array
    const marcasArray = Object.keys(marcasContadas).map(marca => ({
      name: marca,
      cantidad: marcasContadas[marca]
    }));

    this.marcasProducts = marcasArray;

  }

  seleccionado(credentials: string){
    this.cookie.set('id_producto_seleccionado', credentials, 1, '/products');
    this.router.navigateByUrl('products/view');
  }

}
