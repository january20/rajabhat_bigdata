import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SchoolmisRoutingModule } from './schoolmis-routing.module';
import { SchoolmisComponent } from './schoolmis.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [SchoolmisComponent],
  imports: [
    CommonModule,
    SchoolmisRoutingModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,

    NgxChartsModule,
    FlexLayoutModule
  ]
})
export class SchoolmisModule { }
