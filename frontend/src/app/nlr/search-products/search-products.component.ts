import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { searchProduct } from '../interfaces/registros';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.scss'
})
export class SearchProductsComponent implements OnInit {

  searchText: string = '';
  
  // Variables booleanas
  isSearching: boolean = true;
  
  constructor(private serviceAI: GeminiService) { }
  ngOnInit(): void { }

  search(){
    console.log('Buscando:', this.searchText);
    this.isSearching = !this.searchText;

    /* this.serviceAI.set_message(this.searchText as unknown as searchProduct).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error.error.message);
      }
    }); */
  }
}
