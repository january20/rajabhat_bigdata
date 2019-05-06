import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

import { ProjectsComponent } from './projects.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';
import { ActivityComponent } from './activity/activity.component';
import { MylistComponent } from './mylist/mylist.component';

import { ProjectService } from './shared/project.service';

@NgModule({
  declarations: [ProjectsComponent, ListComponent, ShowComponent, FormComponent, ActivityComponent, MylistComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectsModule { }
