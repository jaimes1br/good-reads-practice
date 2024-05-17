import { Injectable } from '@angular/core';
import { of, tap, BehaviorSubject ,map, Observable } from 'rxjs';

import { BooksNumbers, Library, LibraryElement, SearchBooks } from '@core/models/Books.model';
import { MyListBooks } from '@core/models/StorageBooks.model';
import { BOOKS } from '../../data/books';
 
@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private maxPages: number = 0;
  private myListISBN: string[] = []
  private myBookList: MyListBooks = {
    pending: [],
    reading: [],
    read: []
  };

  librarySubject = new BehaviorSubject<Library | null>(null);
  library$: Observable<Library | null> = this.librarySubject.asObservable(); 
 
  availableBooksSubject = new BehaviorSubject<Library | null>(null);
  availableBooks$: Observable<Library | null> = this.availableBooksSubject.asObservable();
 
  myBooksListSubject = new BehaviorSubject<MyListBooks | null>(null);
  myBooksList$: Observable<MyListBooks | null> = this.myBooksListSubject.asObservable();

  bookNumbersSubject = new BehaviorSubject<BooksNumbers>({available: 0,myList: 0, maxPages: 0});
  bookNumbers$: Observable<BooksNumbers> = this.bookNumbersSubject.asObservable();

  availableBooksSearchedSubject = new BehaviorSubject<SearchBooks>({selected: [],rest: []});
  availableBooksSearched$: Observable<SearchBooks> = this.availableBooksSearchedSubject.asObservable();
 
  constructor() { }
  
  getAllBooks(): Observable<LibraryElement[]>{
    return of(BOOKS)
      .pipe(
        tap(library => this.librarySubject.next(library)),
        map(library => library['library']),
        tap(() => this.getMyListISBN()),
        tap(() => this.updateAvailableList()),
        tap(() => this.setBooksNumbers())
      );
  }
  
  getMyListISBN(): void{  
    const localListISBN = localStorage.getItem('myListISBN');
    
    if(!!localListISBN){
      this.myListISBN = JSON.parse(localListISBN);
      this.getMyBookListLocal();
      this.updateAvailableList(); 
    }else{
      this.availableBooksSubject.next(this.librarySubject.getValue());
      this.myListISBN = [];
    }
  }

  updateAvailableList(): void{
    const tempAllBooks = this.librarySubject.getValue();
    
    if(!!tempAllBooks){
      const tempAll = tempAllBooks['library'].slice();
      let pagesNumber: number[] = [];
      const available = tempAll.filter(({book} )=> {
        pagesNumber.push(book.pages);
        return !this.myListISBN.includes(book.ISBN);
      });

      this.maxPages = Math.max(...pagesNumber);
      this.availableBooksSubject.next({library: [...available]});
    }
  }
  
  addBookOnMyList(isbn: string): void{
    this.myListISBN.push(isbn);
    localStorage.setItem('myListISBN',JSON.stringify(this.myListISBN));
    
    this.updateMyBookListLocalStorage(isbn);
    this.updateAvailableList();
    this.setBooksNumbers();
  }

  removeBookOnMyList(isbn: string): void{
    this.myListISBN = this.myListISBN.filter(isbnNum => isbnNum !== isbn);
    localStorage.setItem('myListISBN',JSON.stringify(this.myListISBN));


    this.myBookList.pending = this.myBookList.pending.filter(book => book.book.ISBN !== isbn);
    this.myBookList.reading = this.myBookList.reading.filter(book => book.book.ISBN !== isbn);
    this.myBookList.read    = this.myBookList.read.filter(book => book.book.ISBN !== isbn);

    localStorage.setItem('myBookList',JSON.stringify(this.myBookList));
    this.myBooksListSubject.next(this.myBookList);
    
    this.updateAvailableList();
    this.setBooksNumbers();
  }

  updateMyBookListLocalStorage(isbn: string): void{
    const tempAllBooks = this.librarySubject.getValue();
    
    if(!!tempAllBooks){
      const tempAll = tempAllBooks['library'].slice();
      const book = tempAll.filter(book => book.book.ISBN === isbn);

      this.myBookList.pending.push(...book);
      localStorage.setItem('myBookList',JSON.stringify(this.myBookList));
    }
  }

  setBooksNumbers(): void{
    const total = this.librarySubject.getValue()!['library'].slice().length;
    const totalMyList = this.myListISBN.length; 

    this.bookNumbersSubject.next({
      available: total - totalMyList,
      myList: totalMyList,
      maxPages: this.maxPages
    });
  }

  getMyBookListLocal(): void{
    const myBookListLocal = localStorage.getItem('myBookList');
    
    if(!!myBookListLocal){
      this.myBookList = JSON.parse(myBookListLocal);
    }else{
      this.myBookList = {
        pending: [],
        reading: [],
        read: []
      }
    }

    this.myBooksListSubject.next(this.myBookList);
  }

  getSearchBooks(term:string): void {
    const mylibraryObj = this.myBooksListSubject.getValue();
    let myLibrary: LibraryElement[] = [];
    if(mylibraryObj){
      myLibrary = [
        ...mylibraryObj?.pending,
        ...mylibraryObj?.read,
        ...mylibraryObj?.reading,
      ]
    }

    const restBooks = this.availableBooksSubject.getValue()!['library'];   

    const search: {
      selected:LibraryElement[],
      rest: LibraryElement[]
    } = {
      selected : [],
      rest: []
    } 

    search.selected = myLibrary.filter(({book}:LibraryElement) => {
          const author = book.author.name.toLowerCase();
          const title = book.title.toLowerCase();
  
          return (author.includes(term) || title.includes(term))
    });

    search.rest = restBooks.filter(({book}:LibraryElement) => {
      const author = book.author.name.toLowerCase();
      const title = book.title.toLowerCase();

      return (author.includes(term) || title.includes(term))
    });

    this.availableBooksSearchedSubject.next(search);
  }

}

