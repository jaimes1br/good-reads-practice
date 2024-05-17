import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookService } from '@shared/services/book.service';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
    selector: 'goodReads-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet,NavbarComponent]
})
export class AppComponent implements OnInit {

  
  constructor(private bookService: BookService){}
 
  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe();
  }
}
