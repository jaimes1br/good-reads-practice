import { Component, OnInit } from '@angular/core';
import { BookService } from '@shared/services/book.service';
@Component({
  selector: 'goodReads-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public bookService: BookService){}
}
