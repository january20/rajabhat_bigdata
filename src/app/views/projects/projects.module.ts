import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

import { ProjectsComponent } from './projects.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';
import { ActivityComponent } from './activity/activity.component';
import { MylistComponent } from './mylist/mylist.component';

import { ProjectService } from './shared/project.service';
import { TargetAreasComponent } from './form/target-areas/target-areas.component';
import { TargetAreaComponent } from './form/target-areas/target-area/target-area.component';
import { MainStaffsComponent } from './form/main-staffs/main-staffs.component';
import { MainStaffComponent } from './form/main-staffs/main-staff/main-staff.component';
import { SubStaffsComponent } from './form/sub-staffs/sub-staffs.component';
import { SubStaffComponent } from './form/sub-staffs/sub-staff/sub-staff.component';
import { ExtStaffsComponent } from './form/ext-staffs/ext-staffs.component';
import { ExtStaffComponent } from './form/ext-staffs/ext-staff/ext-staff.component';
import { SchemesComponent } from './form/schemes/schemes.component';
import { SrruStrategiesComponent } from './form/srru-strategies/srru-strategies.component';
import { RajabhatStrategiesComponent } from './form/rajabhat-strategies/rajabhat-strategies.component';
import { NationalStrategiesComponent } from './form/national-strategies/national-strategies.component';
import { ObjectivesComponent } from './form/objectives/objectives.component';
import { AlliancesComponent } from './form/alliances/alliances.component';
import { BenefitsComponent } from './form/benefits/benefits.component';
import { ObjectiveComponent } from './form/objectives/objective/objective.component';
import { OutputComponent } from './form/objectives/output/output.component';
import { KpiComponent } from './form/objectives/kpi/kpi.component';
import { OactivityComponent } from './form/objectives/oactivity/oactivity.component';
import { AllianceComponent } from './form/alliances/alliance/alliance.component';

@NgModule({
  declarations: [ProjectsComponent, ListComponent, ShowComponent, FormComponent, ActivityComponent, MylistComponent, TargetAreasComponent, TargetAreaComponent, MainStaffsComponent, MainStaffComponent, SubStaffsComponent, SubStaffComponent, ExtStaffsComponent, ExtStaffComponent, SchemesComponent, SrruStrategiesComponent, RajabhatStrategiesComponent, NationalStrategiesComponent, ObjectivesComponent, AlliancesComponent, BenefitsComponent, ObjectiveComponent, OutputComponent, KpiComponent, OactivityComponent, AllianceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectsModule { }
