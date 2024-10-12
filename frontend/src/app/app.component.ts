import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './nlr/navbar/navbar.component';
import { NlrservicesService } from './services/nlrservices.service';
import { CookieService } from 'ngx-cookie-service';
import { UsersComponent } from './nlr/registre/users/users.component';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ProductsimgService } from './services/productsimg.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [NgModule, NlrservicesService, CookieService, ProductsimgService],
  imports: [CommonModule, NavbarComponent, UsersComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  showNavbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/list') {
          // Si estás en la ruta 'list', oculta el navbar
          this.showNavbar = false;
        } else {
          // Si sales de la ruta 'list', muestra el navbar
          this.showNavbar = true;
        }
      }
    });
  }
}
