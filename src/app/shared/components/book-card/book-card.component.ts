import { Component, Input } from '@angular/core';
import { LibraryElement } from '@core/models/Books.model';
import { NgIf } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
    selector: 'goodReads-book-card',
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss'],
    standalone: true,
    imports: [CdkDrag, NgIf]
})
export class BookCardComponent {
  
  imgLoaded: boolean = false;
  @Input() book!: LibraryElement;
}
