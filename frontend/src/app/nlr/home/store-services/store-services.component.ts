import { Component, OnInit } from '@angular/core';
import { searchService, Servicios_view } from '../../interfaces/registros';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-store-services',
  standalone: true,
  imports: [NgFor, DialogModule],
  templateUrl: './store-services.component.html',
  styleUrl: './store-services.component.scss'
})
export class StoreServicesComponent implements OnInit {

  service: Servicios_view[] = [];
  visible: boolean = false;
  viewService: Servicios_view = {
    id: 0,
    name: '',
    descripcion: '',
    img: '',
    ejecucion: '',
  };

  constructor(private nlrService: NlrservicesService) { 
    this.getServices();
  }

  ngOnInit(): void {
  }

  getServices(){
    this.nlrService.indexService().subscribe({

      next: (data: any) => {
        console.log(data);
        this.service = data;
      },
      error: error => {
        console.error(error);
    }
      
    })
  }


  showDialog(credenciales: number) {
    this.visible = true;
    this.nlrService.showService(credenciales as unknown as searchService).subscribe({
      next: (data: any) => {
        console.log(data);
        
        this.viewService = data;
      },
      error: error => {
        console.error(error);
      }
    });
    
  }

  openWhatsApp(credenciales: string) {
    const phoneNumber = '584124784633';
    const message = `Hola, me gustaría obtener más información sobre el servicio de ${credenciales}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank'); // Abre WhatsApp en una nueva pestaña
  }
}
