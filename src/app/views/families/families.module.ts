import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { FamiliesRoutingModule } from './families-routing.module';
import { FamiliesComponent } from './families.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ShowComponent } from './show/show.component';
import { MembersComponent } from './form/members/members.component';
import { MemberComponent } from './form/members/member/member.component';
import { HealthFormComponent } from './health/health-form/health-form.component';
import { HealthInfoComponent } from './health/health-info/health-info.component';
import { MembersModalComponent } from './members-modal/members-modal.component';

@NgModule({
  declarations: [FamiliesComponent, ListComponent, FormComponent, ShowComponent, MembersComponent, MemberComponent, HealthFormComponent, HealthInfoComponent, MembersModalComponent],
  imports: [
    CommonModule,
    FamiliesRoutingModule,
    SharedModule
  ],
  entryComponents: [ MembersModalComponent ],
  exports: [
    ListComponent,
    MembersModalComponent
  ]
})
export class FamiliesModule { }
