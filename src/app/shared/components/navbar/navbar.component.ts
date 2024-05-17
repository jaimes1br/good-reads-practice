import { Component, inject } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookService } from '@shared/services/book.service';
import { SearchComponent } from '../search/search.component';
@Component({
    selector: 'goodReads-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgIf, SearchComponent, AsyncPipe]
})
export class NavbarComponent {
  
  public bookService = inject(BookService);
}
