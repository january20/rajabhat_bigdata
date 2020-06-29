import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomesRoutingModule } from './homes-routing.module';
import { HomesComponent } from './homes.component';

@NgModule({
  declarations: [HomesComponent],
  imports: [
    CommonModule,
    HomesRoutingModule
  ]
})
export class HomesModule { }
