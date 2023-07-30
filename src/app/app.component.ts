import { Component } from '@angular/core';
import { BookService } from './services/book.service';

@Component({
  selector: 'goodReads-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private bookService: BookService){}
 
  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe();
  }
}
