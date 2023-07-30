import { Injectable } from '@angular/core';
import { of, tap, BehaviorSubject ,map, Observable } from 'rxjs';
import { BOOKS } from '../shared/mocks/books';
import { BooksNumbers, Library, LibraryElement } from '../shared/interfaces/Books';
import { DataGenre } from '../shared/interfaces/DataGenre';
 
@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private myList: string[] = [];
  librarySubject = new BehaviorSubject<Library | null>(null);
  library$: Observable<Library | null> = this.librarySubject.asObservable(); 
  availableBooksSubject = new BehaviorSubject<Library | null>(null);
  availableBooks$: Observable<Library | null> = this.availableBooksSubject.asObservable();
 
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
        tap(() => this.getBookMyList()),
        tap(() => this.setBooksNumbers())
      );
  }
  
  getBookMyList(){
    const myList = localStorage.getItem('myList');
    if(!!myList){
      this.myList = JSON.parse(localStorage.getItem('myList')!);
      const tempBooks = this.librarySubject.getValue();
      if(!!tempBooks){
        const tempAll = tempBooks['library'].slice();
        const available = tempAll.filter(book => !myList.includes(book.book.ISBN));
        this.availableBooksSubject.next({library: [...available]});
      }       
    }else{
      this.availableBooksSubject.next(this.librarySubject.getValue());
    }
  }
  
  addBookOnMyList(isbn: string): void{
    this.myList.push(isbn);
    localStorage.setItem('myList',JSON.stringify(this.myList));

    let available = this.availableBooksSubject.getValue()!['library'].slice();
    available = available.filter(book => book.book.ISBN !== isbn);
    this.availableBooksSubject.next({library: [...available]});
    this.setBooksNumbers();
  }

  removeBookOnMyList(isbn: string): void{
    this.myList = this.myList.filter(isbnElement => isbnElement !== isbn);
    localStorage.setItem('myList',JSON.stringify(this.myList));
    this.setBooksNumbers();
    
  }

  setBooksNumbers(){
    const total = this.librarySubject.getValue()!['library'].slice().length;
    const totalMyList = this.myList.length; 

    this.bookNumbersSubject.next({
      available: total - totalMyList,
      myList: totalMyList
    });
  }
}

