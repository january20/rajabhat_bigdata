import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { DevplansRoutingModule } from './devplans-routing.module';
import { DevplansComponent } from './devplans.component';

@NgModule({
  declarations: [DevplansComponent],
  imports: [
    CommonModule,
    DevplansRoutingModule,
    SharedModule
  ]
})
export class DevplansModule { }
