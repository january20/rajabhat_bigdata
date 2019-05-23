import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss']
})
export class AssessmentFormComponent implements OnInit {

  project: Array<Object>;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.projectService.getCreateAssessment(this.route.snapshot.params.id).subscribe((data: any) => this.project = data);
  }

}
