import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { MylistComponent } from './mylist/mylist.component';
import { ActivityComponent } from './activity/activity.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'mylist',
    component: MylistComponent
  },
  {
    path: 'create',
    component: FormComponent,
    data: { formType: 'CREATE' }
  },
  {
    path: ':id/edit',
    component: FormComponent,
    data: { formType: 'EDIT' }
  },
  {
    path: ':id/activity',
    component: ActivityComponent
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
