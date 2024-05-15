import { Component } from '@angular/core';
import { BookPreview } from '../../shared/interfaces/Books';

@Component({
  selector: 'goodReads-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.scss']
})
export class HomePagesComponent {


  titleGood:string = 'Good';
  titleReads:string = 'Reads';

  booksPreview: BookPreview[] = [
    {
      title:  'Juego de Tronos',
      author: 'George R. R. Martin',
      cover:  '/assets/juego.jpg',
    },
    {
      title:  '1984',
      author: 'George Orwell',
      cover:  '/assets/1984.jpg',
    },
    {
      title:  'Fahrenheit 451',
      author: 'Ray Bradbury',
      cover:  '/assets/451.jpg',
    },
  ];
}
