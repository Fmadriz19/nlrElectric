import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  
  darkMode: boolean = false;

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark'){
      document.documentElement.classList.add('dark');
      this.darkMode = !this.darkMode;
    } else {
      this.darkMode = false;
    }
    
  }

  modeDark(){
    console.log('se cambio el modo dark')
    this.darkMode = !this.darkMode;

    if (this.darkMode){
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

  }
}
