import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { StriphtmlPipe } from './pipes/striphtml.pipe';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [StriphtmlPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqiHOgtttCiHMRunb67vOkcSoa5y9kQ14'
    })
  ],
  providers: [
    AuthenticationService,
    UserService
  ],
  exports: [
    ReactiveFormsModule,
    AgmCoreModule,
    StriphtmlPipe
  ]
})
export class SharedModule { }
