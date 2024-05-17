import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookCardComponent } from './components/book-card/book-card.component';
import { BookComponent } from './components/book/book.component';
import { DragDropBooksComponent } from './components/drag-drop-books/drag-drop-books.component';
import { GenreItemComponent } from './components/genre-item/genre-item.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    BookCardComponent,
    BookComponent,
    DragDropBooksComponent,
    GenreItemComponent,
    GenreListComponent,
    NavbarComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    BookCardComponent,
    BookComponent,
    DragDropBooksComponent,
    GenreItemComponent,
    GenreListComponent,
    NavbarComponent,
    SearchComponent,
  ]
})
export class SharedModule { }
