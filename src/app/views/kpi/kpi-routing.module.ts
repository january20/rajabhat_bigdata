import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpiComponent } from './kpi.component';


const routes: Routes = [
  {
    path:'',
    component:KpiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiRoutingModule { }
