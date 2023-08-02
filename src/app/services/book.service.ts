import { Injectable } from '@angular/core';
import { of, tap, BehaviorSubject ,map, Observable } from 'rxjs';
import { BOOKS } from '../shared/mocks/books';
import { BooksNumbers, Library, LibraryElement } from '../shared/interfaces/Books';
import { DataGenre } from '../shared/interfaces/DataGenre';
import { MyListBooks } from '../shared/interfaces/StorageBooks';
 
@Injectable({
  providedIn: 'root'
})
export class BookService {
  
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

  genresListSubject = new BehaviorSubject<DataGenre[]>([]);
  genresList$: Observable<DataGenre[]> = this.genresListSubject.asObservable();
  
  bookNumbersSubject = new BehaviorSubject<BooksNumbers>({available: 0,myList: 0});
  bookNumbers$: Observable<BooksNumbers> = this.bookNumbersSubject.asObservable();

  constructor() { }
  
  getAllBooks(): Observable<LibraryElement[]>{
    return of(BOOKS)
      .pipe(
        tap(library => this.librarySubject.next(library)),
        map(library => library['library']),
        tap(books => {
          const tempGenres = books.map(book => book.book.genre);
          let genres = [...new Set(tempGenres)];
          genres.unshift('Todos');
          const genderList = genres.map((genre,index) => {
            return {
              name: genre, isSelected: false, index 
            }
          });

          genderList[0].isSelected = true; 
          this.genresListSubject.next(genderList);
        }),
        tap(() => this.getMyListISBN()),
        tap(() => this.updateAvailableList()),
        tap(() => this.setBooksNumbers())
      );
  }
  
  getMyListISBN(){  
    const localListISBN = localStorage.getItem('myListISBN');
    
    if(!!localListISBN){
      this.myListISBN = JSON.parse(localListISBN);
      this.updateAvailableList(); 
    }else{
      this.availableBooksSubject.next(this.librarySubject.getValue());
      this.myListISBN = [];
    }
  }

  updateAvailableList(){
    const tempAllBooks = this.librarySubject.getValue();
    
    if(!!tempAllBooks){
      const tempAll = tempAllBooks['library'].slice();
      const available = tempAll.filter(book => !this.myListISBN.includes(book.book.ISBN));
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
    console.log('hola remove ' + isbn);
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

  setBooksNumbers(){
    const total = this.librarySubject.getValue()!['library'].slice().length;
    const totalMyList = this.myListISBN.length; 

    this.bookNumbersSubject.next({
      available: total - totalMyList,
      myList: totalMyList
    });
  }

  getMyBookListLocal(){
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
}

