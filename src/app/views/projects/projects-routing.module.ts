import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { MylistComponent } from './mylist/mylist.component';
import { ActivityComponent } from './activity/activity.component';
import { FormComponent } from './form/form.component';
import { AssessmentProjectListComponent } from './assessment/assessment-project-list/assessment-project-list.component';
import { AssessmentResultComponent } from './assessment/assessment-result/assessment-result.component';
import { AssessmentFormComponent } from './assessment/assessment-form/assessment-form.component';
import { AssessmentManualComponent } from './assessment/assessment-manual/assessment-manual.component';
import { ActivityListComponent } from './activity/activity-list/activity-list.component';
import { ActivityFormComponent } from './activity/activity-form/activity-form.component';
import { AuthRolesGuard } from 'src/app/shared/guards/auth-roles.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'mylist',
    component: MylistComponent,
    canActivate: [AuthRolesGuard],
    data: { expectedRole: 'srru_personnel' }
  },
  {
    path: 'create',
    component: FormComponent,
    canActivate: [AuthRolesGuard],
    data: { formType: 'CREATE', expectedRole: 'srru_personnel' }
  },
  {
    path: 'assessment',
    canActivate: [AuthRolesGuard],
    data: { expectedRole: 'project_assessor' },
    children: [
      {
        path: 'project_list',
        component: AssessmentProjectListComponent
      },
      {
        path: ':id/result',
        component: AssessmentResultComponent
      },
      {
        path: 'manual',
        component: AssessmentManualComponent
      },
      {
        path: ':id/create',
        component: AssessmentFormComponent
      }
    ]
  },
  {
    path: ':id/edit',
    component: FormComponent,
    canActivate: [AuthRolesGuard],
    data: { formType: 'EDIT', expectedRole: 'srru_personnel' }
  },
  {
    path: ':id/activity',
    canActivate: [AuthRolesGuard],
    data: { expectedRole: 'srru_personnel' },
    children: [
      {
        path: '',
        component: ActivityListComponent
      },
      {
        path: 'create',
        component: ActivityFormComponent,
        data: { formType: 'CREATE', title: 'รายงานกิจกรรม' }
      },
      {
        path: ':activity_id/edit',
        component: ActivityFormComponent,
        data: { formType: 'EDIT', title: 'แก้ไขกิจกรรม' }
      }
    ]
  },
  {
    path: ':id',
    component: ShowComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
