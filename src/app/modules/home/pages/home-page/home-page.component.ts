import { Component } from '@angular/core';
import { BookPreview } from '@core/models/Books.model';
import { NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'goodReads-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [RouterLink, NgFor, NgClass]
})
export class HomePageComponent {


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
