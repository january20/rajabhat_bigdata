import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./schoolmis/schoolmis.module').then(m => m.SchoolmisModule)
  },
  {
    path:'map',
    component: MapComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
