import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ShowComponent } from './show/show.component';
import { MylistComponent } from './mylist/mylist.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'create',
    component: FormComponent,
    data: { formType: 'CREATE', title: 'เพิ่มผู้เชี่ยวชาญ' }
  },
  {
    path: 'mylist',
    component: MylistComponent
  },
  {
    path: ':id/edit',
    component: FormComponent,
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
