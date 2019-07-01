import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowComponent } from './show/show.component';
import { PlantFormComponent } from './plants/plant-form/plant-form.component';
import { AnimalFormComponent } from './animals/animal-form/animal-form.component';
import { PlantShowComponent } from './plants/plant-show/plant-show.component';
import { AnimalShowComponent } from './animals/animal-show/animal-show.component';

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
      },
      {
        path: ':id',
        component: PlantShowComponent
      }
    ]
  },
  {
    path: 'animals',
    children: [
      {
        path: 'create',
        component: AnimalFormComponent
      },
      {
        path: ':id',
        component: AnimalShowComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BioRoutingModule { }
