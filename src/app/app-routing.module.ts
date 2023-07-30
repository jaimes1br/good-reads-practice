import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { BooksPagesComponent } from './pages/books-pages/books-pages.component';

const routes: Routes = [
    { path: 'home', component: HomePagesComponent },
    { path: 'books', component: BooksPagesComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }