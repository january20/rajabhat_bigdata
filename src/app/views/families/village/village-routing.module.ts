import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VillageComponent } from './village.component';

const routes: Routes = [
  {
    path: ':vid',
    component: VillageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VillageRoutingModule { }
