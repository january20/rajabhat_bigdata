import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-assessment-project-list',
  templateUrl: './assessment-project-list.component.html',
  styleUrls: ['./assessment-project-list.component.scss']
})
export class AssessmentProjectListComponent implements OnInit {

  projects: Array<Object>;
  strategy: Array<Object>;
  currentUser: any;

  constructor(
    private projectService: ProjectService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.loadData(this.currentUser.info.assessor_kpi_id);
  }

  loadData(id) {
    this.projectService.getAssessmentProjects(id).subscribe((data: any) => {
      this.projects = data.projects;
      this.strategy = data.strategy;
    });
  }

}
