import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropListGroup, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { LibraryElement } from '@core/models/Books.model';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
    selector: 'goodReads-drag-drop-books',
    templateUrl: './drag-drop-books.component.html',
    styleUrls: ['./drag-drop-books.component.scss'],
    standalone: true,
    imports: [CdkDropListGroup, CdkDropList, NgFor, BookCardComponent]
})
export class DragDropBooksComponent {

  @Input({required: true}) pending: LibraryElement[] = [];
  @Input({required: true}) reading: LibraryElement[] = [];
  @Input({required: true}) read: LibraryElement[] = [];
  
  drop(event: CdkDragDrop<LibraryElement[]>): void{
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } 
    
    this.updateLocal();
  }
  
  updateLocal(): void{
    const books = {
      pending: this.pending,
      reading: this.reading,
      read: this.read
    }
    
    localStorage.setItem('myBookList',JSON.stringify(books));
  }
}
