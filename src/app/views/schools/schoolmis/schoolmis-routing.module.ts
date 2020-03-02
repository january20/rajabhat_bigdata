import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolmisComponent } from './schoolmis.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolmisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolmisRoutingModule { }
