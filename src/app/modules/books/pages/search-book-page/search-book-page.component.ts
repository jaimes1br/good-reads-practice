import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryElement } from '@core/models/Books.model';
import { BookService } from '@shared/services/book.service';

@Component({
  selector: 'goodReads-search-book-page',
  templateUrl: './search-book-page.component.html',
  styleUrls: ['./search-book-page.component.scss']
})
export class SearchBookPageComponent {

  availableSelected: LibraryElement[] = [];
  availableRest: LibraryElement[] = [];
  bookToSearch: string = '';
  totalBooks:number = 0

  constructor(private route: ActivatedRoute, private bookService: BookService){}
  
  ngOnInit(): void {
    this.bookService.availableBooksSearched$.subscribe(({rest,selected}) => {
      this.availableRest = rest.slice();
      this.availableSelected = selected.slice();
      
      this.totalBooks = rest.length + selected.length;
    });

    this.route.url.subscribe(url => {
      
      this.bookToSearch = url[0].path;
      this.bookService.getSearchBooks(this.bookToSearch.toLowerCase());
    });
  }
}
