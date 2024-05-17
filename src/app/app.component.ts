import { Component, OnInit } from '@angular/core';
import { BookService } from '@shared/services/book.service';

@Component({
  selector: 'goodReads-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  
  constructor(private bookService: BookService){}
 
  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe();
  }
}
