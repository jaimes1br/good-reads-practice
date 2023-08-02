import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { BooksPagesComponent } from './pages/books-pages/books-pages.component';
import { MyListPageComponent } from './pages/my-list-page/my-list-page.component';

const routes: Routes = [
    { path: 'home', component: HomePagesComponent },
    { path: 'books', component: BooksPagesComponent },
    { path: 'my-list', component: MyListPageComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }