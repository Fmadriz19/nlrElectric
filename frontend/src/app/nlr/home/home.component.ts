import { Component, OnInit } from '@angular/core';
import { home_img } from '../interfaces/files';
import { NgFor, NgStyle } from '@angular/common';
import { colaboradores } from '../interfaces/registros';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  slider_img: home_img[] = [];
  currentIndex: number = 3;
  collaborators: colaboradores[] = [];

  constructor () {
    this.slider_img = [
      {
        url: 'https://cuervaenergia.com/static/ed402570faa685476e42b6ae0b7a6c87/c0a1e/mantenimiento-electrico-industrial.webp'
      },
      {
        url: 'assets/nlr/web/ingeniero_electricista_2.jpg'
      },
      {
        url: 'assets/nlr/web/ingeniero_electricista.jpg'
      },
      {
        url: 'assets/nlr/web/subestacao-mundau-.jpg'
      },
    ]

    this.collaborators = [
      {
        url: 'assets/nlr/web/franciscoco.jpg',
        name: 'Franciscoco Madriz',
        rol: 'Web Developer',
        ig: 'https://www.instagram.com/pedroperez',
        gm: 'https://www.google.com/pedroperez'
      },
      {
        url: 'assets/nlr/web/andres.jpg',
        name: 'Andres Santamaria',
        rol: 'UI/UX Designer',
        ig: 'https://www.instagram.com/pedroperez',
        gm: 'https://www.google.com/pedroperez'
      },
      {
        url: 'assets/nlr/web/joseyx.jpg',
        name: 'Jose Rojas',
        rol: 'QA Tester',
        ig: 'https://www.instagram.com/pedroperez',
        gm: 'https://www.google.com/pedroperez'
      },
      {
        url: 'assets/nlr/web/rivero.jpg',
        name: 'Daniel Pennella',
        rol: 'Data Scientist',
        ig: 'https://www.instagram.com/pedroperez',
        gm: 'https://www.google.com/pedroperez'
      },
      {
        url: 'assets/nlr/web/gerard.jpg',
        name: 'Gerard Pique',
        rol: 'System Administrator',
        ig: 'https://www.instagram.com/pedroperez',
        gm: 'https://www.google.com/pedroperez'
      },
      {
        url: 'assets/nlr/web/3mosqueteros.jpg',
        name: 'Jesus, Mauricio y Samir',
        rol: 'Especialista en Marketing',
        ig: 'https://www.instagram.com/pedroperez',
        gm: 'https://www.google.com/pedroperez'
      },
      {
        url: 'assets/nlr/web/chat.png',
        name: 'El Papa de los Helados',
        rol: 'Bug Fixer / Debugger',
        ig: 'https://www.instagram.com/pedroperez',
        gm: 'https://www.google.com/pedroperez'
      },
      
    ]

    this.collaborators = [...this.collaborators, ...this.collaborators];
    console.log(this.collaborators);
    
  }

  ngOnInit(): void {
    this.autoSlider();
  }

  prevSlider(){    
    const firstSlide = this.currentIndex === 0;

    if(firstSlide){
      this.currentIndex = this.slider_img.length - 1;
    } else{
      this.currentIndex -= 1;
    }
  }

  nextSlider(){
    const endSlide = this.currentIndex === this.slider_img.length - 1;

    if(endSlide){
      this.currentIndex = 0;
    } else{
      this.currentIndex += 1;
    }
  }

  autoSlider(){
    setInterval (() => {
      this.nextSlider();
    }, 5000)
  }

  openMap() {
    const destination = '69WP+3HW';
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(url, '_blank'); // Abre Google Maps en una nueva pestaña
  }

  openInstagram(){
    window.open('https://www.instagram.com/invnlrelectricca', '_blank');
  }

  openWhatsapp(){
    window.open('https://wa.me/584124784633', '_blank');
  }

}
