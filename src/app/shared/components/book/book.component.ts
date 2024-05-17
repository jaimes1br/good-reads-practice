import { Component, Input } from '@angular/core';
import { Book } from '@core/models/Books.model';

@Component({
  selector: 'goodReads-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
   
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

  // constructor(private bookService: BookService){}

  ngOnInit(): void {
  }

  onSelectedBook(){
    this.isSelected = !this.isSelected;
    this.isRemoved = true;
    // setTimeout(() => {
    //   (this.isSelected)
    //     ? this.bookService.addBookOnMyList(this.book.ISBN)
    //     : this.bookService.removeBookOnMyList(this.book.ISBN)
      
    // }, 900);
  }
}
