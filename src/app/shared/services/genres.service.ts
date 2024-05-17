import { Injectable } from '@angular/core';

import { DataGenre } from '@core/models/DataGenre.model';
import { Library } from '@core/models/Books.model';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private genresList: DataGenre[] = [];

  constructor(private bookService:BookService) {

    this.bookService.librarySubject.subscribe(books => {
      if(!!books)
        this.makeList(books)
    });
  }

  private makeList(books:Library): void {
    const tempGenres = books['library'].map(book => book.book.genre);
    let genres = [...new Set(tempGenres)];
    genres.unshift('Todos');
    this.genresList = genres.map((genre,index) => {
      return {
        name: genre, isSelected: false, index 
      }
    });

    this.genresList[0].isSelected = true; 
  }


  get getGenresList(): DataGenre[] {
    return this.genresList;
  }

  public resetGenresList(): void {
    this.genresList = this.genresList
      .map(g => {
      return {...g,isSelected: false}
    });

    this.genresList[0].isSelected = true;
  }
}
