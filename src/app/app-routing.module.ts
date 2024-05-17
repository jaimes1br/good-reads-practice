import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'books',
    loadChildren: () => import('@modules/books/books.module').then(m => m.BooksModule)
  },
  { 
    path: 'my-list', 
    loadChildren: () => import('@modules/myList/my-list.module').then(m => m.MyListModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home' 
  }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }