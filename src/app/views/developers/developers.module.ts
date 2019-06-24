import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopersRoutingModule } from './developers-routing.module';
import { ApiComponent } from './api/api.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ApiComponent],
  imports: [
    CommonModule,
    DevelopersRoutingModule,
    SharedModule
  ]
})
export class DevelopersModule { }
