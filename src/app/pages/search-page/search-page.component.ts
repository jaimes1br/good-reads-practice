import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Library, LibraryElement } from '../../shared/interfaces/Books';
import { concatMap } from 'rxjs';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'goodReads-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{
  
  
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
      this.bookToSearch = url[1].path;
      this.bookService.getSearchBooks(this.bookToSearch.toLowerCase());
    });
  }

}
