import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { AssessorComponent } from './assessor/assessor.component';
import { SrruPersonnelComponent } from './srru-personnel/srru-personnel.component';
import { VillageHeadmanComponent } from './village-headman/village-headman.component';
import { AllProjectsComponent } from './admin/all-projects/all-projects.component';
import { AllOtopComponent } from './admin/all-otop/all-otop.component';
import { AllExpertsComponent } from './admin/all-experts/all-experts.component';
import { AllFamiliesComponent } from './admin/all-families/all-families.component';
import { AllVillageHeadmanUsersComponent } from './admin/all-village-headman-users/all-village-headman-users.component';
import { ListComponent } from '../families/list/list.component';
import { MembersModalComponent } from '../families/members-modal/members-modal.component';

@NgModule({
  declarations: [DashboardComponent, AdminComponent, AssessorComponent, SrruPersonnelComponent, VillageHeadmanComponent, AllProjectsComponent, AllOtopComponent, AllExpertsComponent, AllFamiliesComponent, AllVillageHeadmanUsersComponent, ListComponent, MembersModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  entryComponents: [ MembersModalComponent ]
})
export class DashboardModule { }
