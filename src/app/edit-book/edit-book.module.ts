import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBookPageRoutingModule } from './edit-book-routing.module';

import { EditBookPage } from './edit-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBookPageRoutingModule
  ],
  declarations: [EditBookPage]
})
export class EditBookPageModule {}
