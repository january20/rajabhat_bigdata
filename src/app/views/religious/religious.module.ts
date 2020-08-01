import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReligiousRoutingModule } from './religious-routing.module';
import { ReligiousComponent } from './religious.component';
import { SitesComponent } from './sites/sites.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ReligiousComponent, SitesComponent],
  imports: [
    CommonModule,
    ReligiousRoutingModule,
    SharedModule
  ]
})
export class ReligiousModule { }
