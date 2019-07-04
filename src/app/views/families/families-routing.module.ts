import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';
import { AuthRolesGuard } from 'src/app/shared/guards/auth-roles.guard';
import { HealthInfoComponent } from './health/health-info/health-info.component';
import { HealthFormComponent } from './health/health-form/health-form.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [AuthRolesGuard],
    data: { expectedRole: 'village_headman' }
  },
  {
    path: 'create',
    component: FormComponent,
    canActivate: [AuthRolesGuard],
    data: { formType: 'CREATE', title: 'เพิ่มครอบครัว', expectedRole: 'village_headman' }
  },
  {
    path: ':id/edit',
    component: FormComponent,
    data: { formType: 'EDIT', title: 'แก้ไขครอบครัว', expectedRole: 'village_headman' }
  },
  {
    path: ':id/health',
    children: [
      {
        path: '',
        component: HealthInfoComponent
      },
      {
        path: 'create',
        component: HealthFormComponent
      }
    ]
  },
  {
    path: ':id',
    component: ShowComponent,
    canActivate: [AuthRolesGuard],
    data: { expectedRole: 'village_headman' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliesRoutingModule { }
