import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EconomicsRoutingModule } from './economics-routing.module';
import { EconomicsComponent } from './economics.component';
import { VolumeComponent } from './volume/volume.component';
import { BestsellerComponent } from './bestseller/bestseller.component';

@NgModule({
  declarations: [EconomicsComponent, VolumeComponent, BestsellerComponent],
  imports: [
    CommonModule,
    EconomicsRoutingModule
  ]
})
export class EconomicsModule { }
