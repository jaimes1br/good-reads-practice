import { Component } from '@angular/core';
import { Book, BooksNumbers, LibraryElement } from '@core/models/Books.model';
import { DataGenre } from '@core/models/DataGenre.model';
import { MyListBooks } from '@core/models/StorageBooks.model';
import { BookService } from '@shared/services/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'goodReads-my-list-page',
  templateUrl: './my-list-page.component.html',
  styleUrls: ['./my-list-page.component.scss']
})
export class MyListPageComponent {

  optionsMyList: DataGenre[] = [
    { name: 'Tablero', isSelected: true, index: 0 },
    { name: 'Lista', isSelected: false, index: 1 },
  ];
  
  isBoard: boolean = true;

  numberMyBookList: number = 0;
  numberSub!: Subscription;
  
  myList!: LibraryElement[];

  myListSub!: Subscription;
  allList: MyListBooks = {
    pending: [],
    reading: [],
    read: []
  }

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.numberSub = this.bookService.bookNumbers$.subscribe(({ myList }:BooksNumbers)=>{
      this.numberMyBookList = myList;    
    });

    this.bookService.getMyBookListLocal();

    this.myListSub = this.bookService.myBooksList$.subscribe(library => {      
      if(library){
        this.allList = {...library};         
        this.updateDisplayMyList();
      }
    });
  }

  onFilterChange(){
    this.isBoard = !this.isBoard;      
    this.updateDisplayMyList();
  }
  
  updateDisplayMyList(){
    if(!this.isBoard){
      this.myList = [
          ...this.allList.pending,
          ...this.allList.reading,
          ...this.allList.read
        ];
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
    if(this.myListSub) this.myListSub.unsubscribe();
    if(this.numberSub) this.numberSub.unsubscribe();
  }

}
