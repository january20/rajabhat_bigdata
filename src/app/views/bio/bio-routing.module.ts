import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowComponent } from './show/show.component';
import { PlantFormComponent } from './plants/plant-form/plant-form.component';
import { AnimalFormComponent } from './animals/animal-form/animal-form.component';

const routes: Routes = [
  {
    path: '',
    component: ShowComponent
  },
  {
    path: 'plants',
    children : [
      {
        path: 'create',
        component: PlantFormComponent
      }
    ]
  },
  {
    path: 'animals',
    children: [
      {
        path: 'create',
        component: AnimalFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BioRoutingModule { }
