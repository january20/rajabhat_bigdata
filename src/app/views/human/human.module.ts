import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SecuritiesComponent } from './securities/securities.component';

import { HumanRoutingModule } from './human-routing.module';

@NgModule({
  declarations: [SecuritiesComponent],
  imports: [
    CommonModule,
    HumanRoutingModule,
    SharedModule
  ]
})
export class HumanModule { }
