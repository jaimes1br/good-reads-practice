import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { BookComponent } from './components/book/book.component';
import { DragDropBooksComponent } from './components/drag-drop-books/drag-drop-books.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { GenreItemComponent } from './components/genre-item/genre-item.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    BookComponent,
    BookCardComponent,
    DragDropBooksComponent,
    GenreItemComponent,
    GenreListComponent,
    NavbarComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BookComponent,
    BookCardComponent,
    DragDropBooksComponent,
    GenreItemComponent,
    GenreListComponent,
    NavbarComponent,
    SearchComponent
  ]
})
export class SharedModule { }
