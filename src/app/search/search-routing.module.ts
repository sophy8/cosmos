import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindItemComponent } from './find-item/find-item.component';
import { SearchPage } from './search.page';
export const searchroutes: Routes = [
    {
        path: '', component: SearchPage,
    },
  { path: 'item', component: FindItemComponent },

];

@NgModule({
  imports: [RouterModule.forChild(searchroutes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
