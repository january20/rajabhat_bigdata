import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeComponent } from './population/income/income.component';
import { PopulationAllComponent } from './population/population-all/population-all.component';
import { AgeComponent } from './population/age/age.component';
import { OccupationComponent } from './population/occupation/occupation.component';
import { EducationComponent } from './population/education/education.component';
import { WeatherComponent } from './env/weather/weather.component';
import { AirComponent } from './env/air/air.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeviceComponent } from './device/device.component';
import { IotComponent } from './iot/iot.component';
import { ThaiqmComponent } from './thaiqm/thaiqm.component';
import { DetailsComponent } from './thaiqm/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'thaiqm',
    children: [
      {
        path: '',
        component: ThaiqmComponent
      },
      {
        path: ':id',
        component: DetailsComponent
      }
    ]
  },
  {
    path: 'iot/:field/:id',
    component: IotComponent
  },
  {
    path: 'population',
    children: [
      {
        path: '',
        component: PopulationAllComponent
      },
      {
        path: 'income',
        component: IncomeComponent
      },
      {
        path: 'age',
        component: AgeComponent
      },
      {
        path: 'occupation',
        component: OccupationComponent
      },
      {
        path: 'education',
        component: EducationComponent
      }
    ]
  },
  {
    path: 'env',
    children: [
      {
        path: 'weather',
        component: WeatherComponent
      },
      {
        path: 'air',
        component: AirComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
