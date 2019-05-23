import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';

@Component({
  selector: 'app-assessment-project-list',
  templateUrl: './assessment-project-list.component.html',
  styleUrls: ['./assessment-project-list.component.scss']
})
export class AssessmentProjectListComponent implements OnInit {

  projects: Array<Object>;
  strategy: Array<Object>;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.projectService.getAssessmentProjects().subscribe((data: any) => {
      this.projects = data.projects;
      this.strategy = data.strategy;
    });
  }

}
