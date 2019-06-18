import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { HomeComponent } from './home.component';
import { ModalComponent } from './modal/modal.component';

import { HomeService } from './shared/home.service';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    HomeComponent, 
    ModalComponent
  ],
  entryComponents: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmap_api_key + '&libraries=visualization'
    }),
    AgmJsMarkerClustererModule,
    HomeRoutingModule,
    SharedModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
