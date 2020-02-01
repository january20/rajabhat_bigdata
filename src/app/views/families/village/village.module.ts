import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VillageRoutingModule } from './village-routing.module';
import { VillageComponent } from './village.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MembersModalComponent } from '../members-modal/members-modal.component';

@NgModule({
  declarations: [VillageComponent],
  // entryComponents: [MembersModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VillageRoutingModule,

    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ]
})
export class VillageModule { }
