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
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';

import { StriphtmlPipe } from './pipes/striphtml.pipe';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [StriphtmlPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  providers: [
    AuthenticationService,
    UserService
  ],
  exports: [
    ReactiveFormsModule,
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
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule
  ]
})
export class SharedModule { }
