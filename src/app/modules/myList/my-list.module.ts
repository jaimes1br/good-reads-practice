import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyListPageComponent } from './pages/my-list-page/my-list-page.component';
import { MyListRoutingModule } from './my-list.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    MyListPageComponent
  ],
  imports: [
    CommonModule,
    MyListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MyListModule { }
