import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'create',
    component: FormComponent,
    data: { formType: 'CREATE', title: 'เพิ่มครอบครัว' }
  },
  {
    path: ':id/edit',
    component: FormComponent,
    data: { formType: 'EDIT', title: 'แก้ไขครอบครัว' }
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
export class FamiliesRoutingModule { }
