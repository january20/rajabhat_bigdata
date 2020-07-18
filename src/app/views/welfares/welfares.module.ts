import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { WelfaresRoutingModule } from './welfares-routing.module';
import { WelfaresComponent } from './welfares.component';

@NgModule({
  declarations: [WelfaresComponent],
  imports: [
    CommonModule,
    SharedModule,
    WelfaresRoutingModule
  ]
})
export class WelfaresModule { }
