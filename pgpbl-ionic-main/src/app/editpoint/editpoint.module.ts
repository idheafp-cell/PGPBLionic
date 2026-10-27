import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { EditpointPageRoutingModule } from './editpoint-routing.module';

import { EditpointPage } from './editpoint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpointPageRoutingModule
  ],
  declarations: [EditpointPage]
})
export class EditpointPageModule {}
