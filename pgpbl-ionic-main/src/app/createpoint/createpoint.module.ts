import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { CreatepointPageRoutingModule } from './createpoint-routing.module';

import { CreatepointPage } from './createpoint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatepointPageRoutingModule
  ],
  declarations: [CreatepointPage]
})
export class CreatepointPageModule {}
