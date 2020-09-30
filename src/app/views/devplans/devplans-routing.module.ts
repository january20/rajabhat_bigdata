import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevplansComponent } from './devplans.component';

const routes: Routes = [
  {
    path:'',
    component: DevplansComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevplansRoutingModule { }
