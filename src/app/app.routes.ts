import { Routes } from '@angular/router'; 

export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('@modules/home/home.routes').then(m => m.homeRoutes) 
  },
  { 
    path: 'books',
    loadChildren: () => import('@modules/books/books.routes').then(m => m.booksRoutes)
  },
  { 
    path: 'my-list', 
    loadChildren: () => import('@modules/myList/my-list.routes').then(m => m.myListRoutes)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home' 
  }
]; 
