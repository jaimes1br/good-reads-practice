import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '@core/models/Books.model';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'goodReads-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf]
})
export class BookComponent {
   
  isRemoved: boolean = false;
  imgLoaded:boolean = false;
  @Input() isOnSearch: boolean = false;
  @Input() isSelected: boolean = false;
  @Input({required: true}) book!: Book;
  
  @Output() remove = new EventEmitter();
  
  onSelectedBook(): void{
    this.isSelected = !this.isSelected;
    this.isRemoved = true;

    this.remove.emit({book:this.book, selected: this.isSelected})
  }
}
