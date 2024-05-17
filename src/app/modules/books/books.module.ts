import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { BooksRoutingModule } from './books.routing.module';
import { SearchBookPageComponent } from './pages/search-book-page/search-book-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BooksPageComponent,
    SearchBookPageComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BooksModule { }
