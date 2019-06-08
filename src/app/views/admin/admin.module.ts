import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserRegisterFormComponent } from './users/user-register-form/user-register-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './users/user-list/user-list.component';

@NgModule({
  declarations: [AdminComponent, UserRegisterFormComponent, UserListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
