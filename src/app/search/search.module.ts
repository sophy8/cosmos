import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchRoutingModule } from './search-routing.module';
import { SearchPage } from './search.page';
import { FindItemComponent } from './find-item/find-item.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchRoutingModule,FormsModule, ReactiveFormsModule,IonicSelectableModule,BsDatepickerModule.forRoot()
  ],
  declarations: [SearchPage, FindItemComponent]
})
export class SearchPageModule {}
