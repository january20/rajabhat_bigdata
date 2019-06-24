import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatSortModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatGridListModule,
  MatCardModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';

import { StriphtmlPipe } from './pipes/striphtml.pipe';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { ReferenceService } from './services/reference.service';

@NgModule({
  declarations: [StriphtmlPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  providers: [
    AuthenticationService,
    UserService,
    ReferenceService
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
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
    MatSortModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatListModule,
    MatSidenavModule
  ]
})
export class SharedModule { }
