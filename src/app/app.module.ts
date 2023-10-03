import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BooksPagesComponent } from './pages/books-pages/books-pages.component';
import { GenreItemComponent } from './components/genre-item/genre-item.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { BookComponent } from './components/book/book.component';
import { MyListPageComponent } from './pages/my-list-page/my-list-page.component';
import { DragDropBooksComponent } from './components/drag-drop-books/drag-drop-books.component';
import { BookCardComponent } from './components/drag-drop-books/book-card/book-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksPagesComponent,
    GenreItemComponent,
    GenreListComponent,
    BookComponent,
    MyListPageComponent,
    DragDropBooksComponent,
    BookCardComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
