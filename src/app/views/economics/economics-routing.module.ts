import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VolumeComponent } from './volume/volume.component';
import { BestsellerComponent } from './bestseller/bestseller.component';

const routes: Routes = [
  {
    path:'',
    component: VolumeComponent
  },
  {
    path:'volume',
    component: VolumeComponent
  },
  {
    path:'bestseller',
    component: BestsellerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EconomicsRoutingModule { }
