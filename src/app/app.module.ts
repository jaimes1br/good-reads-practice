import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BooksPagesComponent } from './pages/books-pages/books-pages.component';
import { GenreItemComponent } from './components/genre-item/genre-item.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { BookComponent } from './components/book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksPagesComponent,
    GenreItemComponent,
    GenreListComponent,
    BookComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
