import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IncomeComponent } from './population/income/income.component';
import { PopulationComponent } from './population/population.component';
import { AgeComponent } from './population/age/age.component';
import { OccupationComponent } from './population/occupation/occupation.component';
import { PopulationAllComponent } from './population/population-all/population-all.component';
import { EducationComponent } from './population/education/education.component';
import { EnvComponent } from './env/env.component';
import { AirComponent } from './env/air/air.component';
import { WeatherComponent } from './env/weather/weather.component';

@NgModule({
  declarations: [InfoComponent, IncomeComponent, PopulationComponent, AgeComponent, OccupationComponent, PopulationAllComponent, EducationComponent, EnvComponent, AirComponent, WeatherComponent],
  imports: [
    CommonModule,
    InfoRoutingModule,
    SharedModule
  ]
})
export class InfoModule { }
