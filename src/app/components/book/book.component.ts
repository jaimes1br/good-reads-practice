import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../shared/interfaces/Books';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'goodReads-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {
   
  isRemoved: boolean = false;
  
  @Input() isOnSearch: boolean = false;
  @Input() isSelected: boolean = false;
  @Input() book: Book = {    
      title:    '',
      pages:    0,
      genre:    '',
      cover:    '',
      synopsis: '',
      year:     0,
      ISBN:     '',
      author: {
        name:       '',
        otherBooks: []
    }
  };

  constructor(private bookService: BookService){}

  ngOnInit(): void {
  }

  onSelectedBook(){
    this.isSelected = !this.isSelected;
    this.isRemoved = true;
    setTimeout(() => {
      (this.isSelected)
        ? this.bookService.addBookOnMyList(this.book.ISBN)
        : this.bookService.removeBookOnMyList(this.book.ISBN)
      
    }, 900);
  }

}

