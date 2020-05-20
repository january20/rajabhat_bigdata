import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IotRoutingModule } from './iot-routing.module';
import { IotComponent } from './iot.component';

@NgModule({
  declarations: [IotComponent],
  imports: [
    CommonModule,
    IotRoutingModule
  ]
})
export class IotModule { }
