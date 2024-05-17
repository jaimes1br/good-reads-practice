import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book, LibraryElement } from '@core/models/Books.model';
import { DataGenre } from '@core/models/DataGenre.model';
import { BookService } from '@shared/services/book.service';
import { Subscription } from 'rxjs';
import { GenresService } from '../../../../shared/services/genres.service';

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

  librarySub!: Subscription;
  booksNumbersSub!: Subscription;

  maxPages: number = 0
  numberOfPages: number = 0;

  constructor(public bookService: BookService, private genresService:GenresService){}
 
  ngOnInit(): void {
    this.librarySub = this.bookService.availableBooks$.subscribe(library => {            
      if(library){
        this.listGenres = this.genresService.getGenresList;
        
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

  trackByFn(index:number, item: LibraryElement){
    return item.book.ISBN
  }

  removeBook({book, selected}: {book: Book, selected: boolean}){
    setTimeout(() => {
      (selected)
        ? this.bookService.addBookOnMyList(book.ISBN)
        : this.bookService.removeBookOnMyList(book.ISBN)
    }, 650);
  }

  ngOnDestroy(): void {
    if(this.librarySub) this.librarySub.unsubscribe();
    if(this.booksNumbersSub) this.booksNumbersSub.unsubscribe();

    this.genresService.resetGenresList();
  }
}
