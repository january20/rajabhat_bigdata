import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AgmCoreModule } from '@agm/core';

import { OtopRoutingModule } from './otop-routing.module';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';
import { MylistComponent } from './mylist/mylist.component';
import { OtopComponent } from './otop.component';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [ListComponent, ShowComponent, FormComponent, MylistComponent, OtopComponent],
  imports: [
    CommonModule,
    OtopRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmap_api_key
    }),
    SharedModule,
    NgxDropzoneModule
  ]
})
export class OtopModule { }
