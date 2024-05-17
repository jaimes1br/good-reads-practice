import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { Book, BooksNumbers, LibraryElement } from '@core/models/Books.model';
import { DataGenre } from '@core/models/DataGenre.model';
import { MyListBooks } from '@core/models/StorageBooks.model';
import { BookService } from '@shared/services/book.service';
import { GenreListComponent } from '@shared/components/genre-list/genre-list.component';
import { DragDropBooksComponent } from '@shared/components/drag-drop-books/drag-drop-books.component';
import { BookComponent } from '@shared/components/book/book.component';

@Component({
    selector: 'goodReads-my-list-page',
    templateUrl: './my-list-page.component.html',
    styleUrls: ['./my-list-page.component.scss'],
    standalone: true,
    imports: [GenreListComponent, RouterLink, NgIf, DragDropBooksComponent, NgFor, BookComponent]
})
export class MyListPageComponent implements OnInit,OnDestroy{

  optionsMyList: DataGenre[] = [
    { name: 'Tablero', isSelected: true, index: 0 },
    { name: 'Lista', isSelected: false, index: 1 },
  ];
  
  isBoard: boolean = true;
  numberMyBookList: number = 0;
  myList!: LibraryElement[];

  listSubs: Subscription[] = [];
  allList: MyListBooks = {
    pending: [],
    reading: [],
    read: []
  }

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    const numberSub = this.bookService.bookNumbers$.subscribe(({ myList }:BooksNumbers)=>{
      this.numberMyBookList = myList;    
    });

    this.bookService.getMyBookListLocal();

    const booksSub = this.bookService.myBooksList$.subscribe(library => {      
      if(library){
        this.allList = {...library};         
        this.updateDisplayMyList();
      }
    });

    this.listSubs = [numberSub,booksSub];
  }

  onFilterChange(): void{
    this.isBoard = !this.isBoard;      
    this.updateDisplayMyList();
  }
  
  updateDisplayMyList(): void{
    if(!this.isBoard){
      this.myList = [
          ...this.allList.pending,
          ...this.allList.reading,
          ...this.allList.read
        ];
    }
  }

  trackByFn(index:number, item: LibraryElement): string{
    return item.book.ISBN
  }

  removeBook({book, selected}: {book: Book, selected: boolean}): void{
    setTimeout(() => {
      (selected)
        ? this.bookService.addBookOnMyList(book.ISBN)
        : this.bookService.removeBookOnMyList(book.ISBN)
    }, 650);
  }

  ngOnDestroy(): void {
    this.listSubs.forEach(o => o.unsubscribe());
  }
}
