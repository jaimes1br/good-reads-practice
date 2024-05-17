import { Component, Input } from '@angular/core';
import { LibraryElement } from '@core/models/Books.model';

@Component({
  selector: 'goodReads-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  
  @Input() book!: LibraryElement;
}
