import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { LibraryElement } from 'src/app/shared/interfaces/Books';

@Component({
  selector: 'goodReads-drag-drop-books',
  templateUrl: './drag-drop-books.component.html',
  styleUrls: ['./drag-drop-books.component.scss']
})
export class DragDropBooksComponent implements OnInit{

  @Input() pending: LibraryElement[] = [];
  @Input() reading: LibraryElement[] = [];
  @Input() read: LibraryElement[] = [];
  
  ngOnInit(): void {

  }
  
  drop(event: CdkDragDrop<LibraryElement[]>) {
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
  
  updateLocal(){
    const books = {
      pending: this.pending,
      reading: this.reading,
      read: this.read
    }
    
    localStorage.setItem('myBookList',JSON.stringify(books));
  }
}
