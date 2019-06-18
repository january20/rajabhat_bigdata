import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ShowComponent } from './show/show.component';
import { MylistComponent } from './mylist/mylist.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'create',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: { formType: 'CREATE', title: 'เพิ่มผู้เชี่ยวชาญ' }
  },
  {
    path: 'mylist',
    canActivate: [AuthGuard],
    component: MylistComponent
  },
  {
    path: ':id/edit',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: { formType: 'EDIT', title: 'แก้ไขผู้เชี่ยวชาญ' }
  },
  {
    path: ':id',
    component: ShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertsRoutingModule { }
