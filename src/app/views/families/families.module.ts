import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliesRoutingModule } from './families-routing.module';
import { FamiliesComponent } from './families.component';

@NgModule({
  declarations: [FamiliesComponent],
  imports: [
    CommonModule,
    FamiliesRoutingModule
  ]
})
export class FamiliesModule { }
