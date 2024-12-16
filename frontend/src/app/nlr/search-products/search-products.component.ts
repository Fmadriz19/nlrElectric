import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { explorarProducts, searchProduct } from '../interfaces/registros';
import { TooltipModule } from 'primeng/tooltip';

declare const Flyon: any; // Declara Flyon para que TypeScript lo reconozca

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass, NgFor, CommonModule, TooltipModule],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.scss'
})
export class SearchProductsComponent implements OnInit {

  searchText : string = '';
  pag_actual: number = 1;
  pagination: number = 8;
  total_products: number = 0;
  // Variables booleanas
  isSearching: boolean = true;
  loading: boolean = false;
  
  array: explorarProducts[] = [];

  constructor(private serviceAI: GeminiService) { }

  ngOnInit(): void {
    /* this.array = [
      {
        title: 'Producto 1',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 2',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'SENSOR INDUCTIVO PLASTICO M12 4 HILOS 12-24VDCV PNP/NPN 1NO O 1NC PROGRAMABLE Sn 4mm SIN CABLE C/M12 SENSOR INDUCTIVO PLASTICO M12 4 HILOS 12-24VDCV PNP/NPN 1NO O 1NC PROGRAMABLE Sn 4mm SIN CABLE C/M12',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 4',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 5',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 1',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 2',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 3',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 4',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 5',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 1',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 2',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 3',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 4',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 5',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 1',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 2',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 3',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 4',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        title: 'Producto 5',
        price: '100',
        type: 'Tipo 1',
        url: 'https://www.google.com',
        image: 'https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
    ];

    this.total_products = this.array.length; */
  }

  search(){
    console.log('Buscando:', this.searchText);
    this.isSearching = false;
    this.loading = !this.loading;

    this.serviceAI.set_message(this.searchText as unknown as searchProduct).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loading = !this.loading;
        this.array = data.results;
        this.total_products = this.array.length;
      },
      error: (error) => {
        console.error(error.error.message);
        this.loading = !this.loading;
      }
    });

  }

  abrir(url: string){
    window.open(url, '_blank');
  }

  // PAGINATION
  totalPag(){
    let valor: number = 0;
    valor = Math.ceil(this.total_products / this.pagination);
    return valor;
  }

  nextPag(pagina: number){ 
    this.pag_actual = pagina;
  }

  productsPag(): any[]{
    const inicio = (this.pag_actual - 1) * this.pagination;
    return this.array.slice(inicio, inicio + this.pagination);
  }

}
