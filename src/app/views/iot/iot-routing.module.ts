import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IotComponent } from './iot.component';

const routes: Routes = [

  {
    path: '',
    component: IotComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IotRoutingModule { }
