import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyListPageComponent } from './pages/my-list-page/my-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: MyListPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyListRoutingModule { }
