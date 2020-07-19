import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecuritiesComponent } from './securities/securities.component';

const routes: Routes = [
  {
    path:'',
    component: SecuritiesComponent
  },
  {
    path:'securities',
    component: SecuritiesComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanRoutingModule { }
