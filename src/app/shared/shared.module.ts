import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqiHOgtttCiHMRunb67vOkcSoa5y9kQ14'
    })
  ],
  exports: [
    AgmCoreModule
  ]
})
export class SharedModule { }
