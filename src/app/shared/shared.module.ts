import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { StriphtmlPipe } from './pipes/striphtml.pipe';

@NgModule({
  declarations: [StriphtmlPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqiHOgtttCiHMRunb67vOkcSoa5y9kQ14'
    })
  ],
  exports: [
    AgmCoreModule,
    StriphtmlPipe
  ]
})
export class SharedModule { }
