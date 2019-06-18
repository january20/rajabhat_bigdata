import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterFormComponent } from './users/user-register-form/user-register-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'users/create',
    component: UserRegisterFormComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'users/list',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'admin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
