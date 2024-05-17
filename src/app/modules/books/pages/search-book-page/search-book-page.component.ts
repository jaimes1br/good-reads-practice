import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { LibraryElement } from '@core/models/Books.model';
import { BookService } from '@shared/services/book.service';
import { BookComponent } from '@shared/components/book/book.component';
@Component({
    selector: 'goodReads-search-book-page',
    templateUrl: './search-book-page.component.html',
    styleUrls: ['./search-book-page.component.scss'],
    standalone: true,
    imports: [RouterLink, NgFor, BookComponent, NgIf, TitleCasePipe]
})
export class SearchBookPageComponent implements OnInit, OnDestroy{

  availableSelected: LibraryElement[] = [];
  availableRest: LibraryElement[] = [];
  bookToSearch: string = '';
  totalBooks:number = 0
  listSub: Subscription[] = [];

  constructor(private route: ActivatedRoute, private bookService: BookService){}
  
  ngOnInit(): void {
    const bookSub = this.bookService.availableBooksSearched$.subscribe(({rest,selected}) => {
      this.availableRest = rest.slice();
      this.availableSelected = selected.slice();
      
      this.totalBooks = rest.length + selected.length;
    });

    this.route.url.subscribe(url => {
      
      this.bookToSearch = url[0].path;
      this.bookService.getSearchBooks(this.bookToSearch.toLowerCase());
    });

    this.listSub = [bookSub];
  }

  ngOnDestroy(): void {
    this.listSub.forEach(o => o.unsubscribe());
  }
}
