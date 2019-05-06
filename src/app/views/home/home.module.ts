import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

import { HomeComponent } from './home.component';
import { ModalComponent } from './modal/modal.component';

import { HomeService } from './shared/home.service';

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
