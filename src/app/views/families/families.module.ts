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

@NgModule({
  declarations: [FamiliesComponent, ListComponent, FormComponent, ShowComponent, MembersComponent, MemberComponent],
  imports: [
    CommonModule,
    FamiliesRoutingModule,
    SharedModule
  ]
})
export class FamiliesModule { }
