import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiRoutingModule } from './kpi-routing.module';
import { KpiComponent } from './kpi.component';

@NgModule({
  declarations: [KpiComponent],
  imports: [
    CommonModule,
    KpiRoutingModule
  ]
})
export class KpiModule { }
