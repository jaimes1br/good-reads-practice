import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { SearchBookPageComponent } from './pages/search-book-page/search-book-page.component';

const routes: Routes = [
  {
    path: '',
    component: BooksPageComponent,
  },
  {
    path: ':nameBook',
    component: SearchBookPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
