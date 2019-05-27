import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpertsRoutingModule } from './experts-routing.module';
import { AgmCoreModule } from '@agm/core';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { ExpertsComponent } from './experts.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [ExpertsComponent, FormComponent, ListComponent, ShowComponent],
  imports: [
    CommonModule,
    ExpertsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmap_api_key
    }),
    SharedModule,
    NgxDropzoneModule
  ]
})
export class ExpertsModule { }
