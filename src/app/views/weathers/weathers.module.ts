import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { WeathersRoutingModule } from './weathers-routing.module';
import { WeathersComponent } from './weathers.component';

@NgModule({
  declarations: [WeathersComponent],
  imports: [
    CommonModule,
    WeathersRoutingModule,
    SharedModule
  ]
})
export class WeathersModule { }
