import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { SharedModule } from 'src/app/shared/shared.module';

import { SchoolsRoutingModule } from './schools-routing.module';
import { MapComponent } from './map/map.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmap_api_key + '&libraries=visualization'
    }),
    AgmJsMarkerClustererModule,
    SharedModule
  ]
})
export class SchoolsModule { }
