import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  MatButtonModule, 
  MatIconModule, 
  MatSelectModule, 
  MatFormFieldModule, 
  MatCheckboxModule, 
  MatProgressSpinnerModule, 
  MatInputModule,
  MatStepperModule,
  MatSnackBarModule,
  MatRadioModule
} from '@angular/material';

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
    StriphtmlPipe,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSnackBarModule,
    MatRadioModule
  ]
})
export class SharedModule { }
