import { Routes } from '@angular/router';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { SearchBookPageComponent } from './pages/search-book-page/search-book-page.component';

export const booksRoutes: Routes = [
  {
    path: '',
    component: BooksPageComponent,
  },
  {
    path: ':nameBook',
    component: SearchBookPageComponent
  }
];