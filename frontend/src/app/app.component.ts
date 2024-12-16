import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './nlr/navbar/navbar.component';
import { NlrservicesService } from './services/nlrservices.service';
import { CookieService } from 'ngx-cookie-service';
import { UsersComponent } from './nlr/registre/users/users.component';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ProductsimgService } from './services/productsimg.service';
import { ScrapingService } from './services/scraping.service';
import { IStaticMethods } from 'flyonui/flyonui';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [NgModule, NlrservicesService, CookieService, ProductsimgService],
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  private intevaloID: any;

  showNavbar: boolean = true;

  constructor(private router: Router, private tasa: ScrapingService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/list') {
          // Si estás en la ruta 'list', oculta el navbar
          this.showNavbar = false;
        } else {
          // Si sales de la ruta 'list', muestra el navbar
          this.showNavbar = true;
          /* setTimeout(() => {
            // @ts-ignore
            HSStaticMethods.autoInit();
          }, 100); */
        }
      }
    });

    this.intevaloID = setInterval(() => this.actualizarTasa(), 43200000);
  }

  actualizarTasa(){
    this.tasa.getApi()

  }

  ngOnDestroy(){
    if (this.intevaloID){
      clearInterval(this.intevaloID);
    }
  }
}
