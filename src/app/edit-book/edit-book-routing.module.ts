import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBookPage } from './edit-book.page';

const routes: Routes = [
  {
    path: '',
    component: EditBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBookPageRoutingModule {}
