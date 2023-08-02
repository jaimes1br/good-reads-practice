import { Component, Input } from '@angular/core';
import { LibraryElement } from 'src/app/shared/interfaces/Books';

@Component({
  selector: 'goodReads-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  @Input() book!: LibraryElement;
  
}
