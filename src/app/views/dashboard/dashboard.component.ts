import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ProjectService } from '../projects/shared/project.service';
import { MatSnackBar } from '@angular/material';
import { FamiliesService } from '../families/shared/families.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  myProjectList: any;
  myEvaluationList: any;
  families: any;

  constructor(
    private authService: AuthenticationService,
    private projectService: ProjectService,
    private familiesService: FamiliesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const user = this.authService.currentUserValue;

    if(user.roles.admin) {

    }

    if(user.roles.srru_personnel) {
      this.projectService.getMyProjectList().subscribe((data: any) => this.myProjectList = data);
    }

    if(user.roles.project_assessor) {
      this.projectService.getAssessmentProjects(user.info.assessor_kpi_id).subscribe((data: any) => this.myEvaluationList = data);
    }

    if(user.roles.village_headman) {
      this.familiesService.getAll().subscribe((data: any) => this.families = data);
    }

    this.currentUser = user;
  }

  deleteProject(id) {
    this.projectService.deleteProject(id).subscribe(
      data => {
        this.snackBar.open('ลบโครงการสำเร็จ', '', {
          horizontalPosition: 'right',
          duration: 2000,
          panelClass: ['color-white', 'bg-success']
        });
        this.loadData();
      },
      err => {
        console.log(err);
      }
    );
  }

}
