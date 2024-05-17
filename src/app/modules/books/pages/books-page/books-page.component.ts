import { Component, OnDestroy, OnInit } from '@angular/core';
import { LibraryElement } from '@core/models/Books.model';
import { DataGenre } from '@core/models/DataGenre.model';
import { Subscription } from 'rxjs';
import { BookService } from '../../../../shared/services/book.service';

@Component({
  selector: 'goodReads-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit, OnDestroy{
  
  totalAvailable: number = 0;
  totalMyList: number = 0;

  library: LibraryElement[] = []; 
  listGenres: DataGenre[] = [];
  listAvailableBooks: LibraryElement[] = [];
  
  isFilter: boolean = false;
  totalBooksGenre: number = 0;
  filterName: string = 'Todos';

  genresSub!: Subscription;
  librarySub!: Subscription;
  booksNumbersSub!: Subscription;

  maxPages: number = 0
  numberOfPages: number = 0;

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

    this.booksNumbersSub = this.bookService.bookNumbers$.subscribe(({available,myList,maxPages}) => {
      this.totalAvailable = available;
      this.totalMyList = myList;
      this.numberOfPages = maxPages
      this.maxPages = maxPages;
    });
  }

  onFilterChange(filter: string){
    const tempAvailable = this.library.filter(({book}) => book.pages <= this.numberOfPages);;
    this.totalAvailable = tempAvailable.length;
    
    this.filterName = filter

    if(filter !== 'Todos'){
      this.listAvailableBooks = tempAvailable.filter(({book}) => book.genre === filter);
      this.totalBooksGenre = this.listAvailableBooks.length;
      this.isFilter = true;
    }else{
      this.listAvailableBooks = tempAvailable.slice();
      this.isFilter = false;
    }
    
  }

  ngOnDestroy(): void {
    if(this.genresSub) this.genresSub.unsubscribe();
    if(this.librarySub) this.librarySub.unsubscribe();
    if(this.booksNumbersSub) this.booksNumbersSub.unsubscribe();
  }
}
