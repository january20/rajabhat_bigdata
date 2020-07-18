import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelfaresComponent } from './welfares.component';
const routes: Routes = [
  {
    path:'',
    component: WelfaresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelfaresRoutingModule { }
