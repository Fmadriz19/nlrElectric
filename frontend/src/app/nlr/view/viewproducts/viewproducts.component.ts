import { Component, OnInit } from '@angular/core';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { ProductsGeneral } from '../../interfaces/registros';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ScrapingService } from '../../../services/scraping.service';

@Component({
  selector: 'app-viewproducts',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './viewproducts.component.html',
  styleUrl: './viewproducts.component.scss'
})

export class ViewproductsComponent implements OnInit{

  product!: ProductsGeneral;
  id_product: string = '';
  bcvtasa: string = '';
  pricebcv: string = '';

  constructor(private nlrservices: NlrservicesService, private cookie: CookieService, private tasa: ScrapingService) {}

  ngOnInit(): void {
    this.getCookie();
    this.getProducts();
  }

  // Get products
  getProducts () {
    this.nlrservices.showProduct(this.id_product as unknown as ProductsGeneral).subscribe({
      next: (res: ProductsGeneral) => {
        
        this.product = res;
        console.log(this.product);
        this.getTasa(); 
        
      },
      error: (err: any) => {
        console.log(err.error.message);
        
      }
    })
  }

  async conversionTasa(){
    this.pricebcv = await this.tasa.conversion(this.product.price); 
  }

  getTasa(){
    this.tasa.getTasa().subscribe({
      next: (res: any) => {
        this.conversionTasa();

      },
      error: (err: any) =>{
        console.error(err.error.message);
        
      }
    });
  }
  //get cookie
  getCookie() {
    this.id_product = this.cookie.get('id_producto_seleccionado');
  }

  formatPriceVES(price: string): string{
    return new Intl.NumberFormat('es-VE', {style: 'currency', currency: 'VES'}).format(Number(price));
  }

  formatPriceUS(price: number): string{
    return new Intl.NumberFormat('es-UD', {style: 'currency', currency: 'USD'}).format(Number(price));
  }
}
