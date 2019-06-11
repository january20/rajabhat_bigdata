import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { AssessorComponent } from './assessor/assessor.component';
import { SrruPersonnelComponent } from './srru-personnel/srru-personnel.component';
import { VillageHeadmanComponent } from './village-headman/village-headman.component';

@NgModule({
  declarations: [DashboardComponent, AdminComponent, AssessorComponent, SrruPersonnelComponent, VillageHeadmanComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
