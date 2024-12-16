import { Component, OnInit } from '@angular/core';
import { home_img } from '../interfaces/files';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  slider_img: home_img[] = [];
  currentIndex: number = 3;

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
}
