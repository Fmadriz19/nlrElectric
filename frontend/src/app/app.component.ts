import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './nlr/navbar/navbar.component';
import { UsersComponent } from './nlr/registre/users/users.component';
import { NlrservicesService } from './services/nlrservices.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [NgModule, NlrservicesService],
  imports: [RouterOutlet, CommonModule, HttpClientModule, NavbarComponent, UsersComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

}
