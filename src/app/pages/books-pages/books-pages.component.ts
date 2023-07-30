import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { DataGenre } from '../../shared/interfaces/DataGenre';
import { LibraryElement } from '../../shared/interfaces/Books';

@Component({
  selector: 'goodReads-books-pages',
  templateUrl: './books-pages.component.html',
  styleUrls: ['./books-pages.component.scss']
})
export class BooksPagesComponent implements OnInit, OnDestroy{
  
  totalAvailable: number = 0;
  totalMyList: number = 0;

  library: LibraryElement[] = []; 
  listGenres: DataGenre[] = [];
  listAvailableBooks: LibraryElement[] = [];
  
  isFilter: boolean = false;
  totalBooksGenre: number = 0;
  filterName: string = '';

  genresSub!: Subscription;
  librarySub!: Subscription;
  booksNumbersSub!: Subscription;

  constructor(private bookService: BookService){}
 
  ngOnInit(): void {
    this.genresSub = this.bookService.genresList$.subscribe(genres => {
        this.listGenres = genres.slice(); 
    });

    this.librarySub = this.bookService.availableBooks$.subscribe(library => {            
      if(library){
        this.library = library['library'];
        (this.isFilter)
          ? this.onFilterChange(this.filterName)
          : this.listAvailableBooks = JSON.parse(JSON.stringify(this.library));
      }  
    });

    this.booksNumbersSub = this.bookService.bookNumbers$.subscribe(({available,myList}) => {
      this.totalAvailable = available;
      this.totalMyList = myList;
    });
  }

  onFilterChange(filter: string){
    if(filter !== 'Todos'){
      const tempList = this.library.filter(book => book.book.genre === filter);
      this.listAvailableBooks = tempList.slice();
      this.totalBooksGenre = this.listAvailableBooks.length;
      this.filterName = filter
      this.isFilter = true;
    }else{
      this.listAvailableBooks = this.library.slice();
      this.isFilter = false;
    }    
  }

  ngOnDestroy(): void {
    if(this.genresSub) this.genresSub.unsubscribe();
    if(this.librarySub) this.librarySub.unsubscribe();
    if(this.booksNumbersSub) this.booksNumbersSub.unsubscribe();
  }
}
