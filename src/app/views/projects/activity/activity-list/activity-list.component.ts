import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  project: any;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.projectService.getProjectActivities(this.route.snapshot.params.id).subscribe(data => this.project = data);
  }

}
