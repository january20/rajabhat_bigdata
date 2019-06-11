import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assessment-result',
  templateUrl: './assessment-result.component.html',
  styleUrls: ['./assessment-result.component.scss']
})
export class AssessmentResultComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.projectService.getAssessmentResult(this.route.snapshot.params.id).subscribe(console.log);
  }

}
