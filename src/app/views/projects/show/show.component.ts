import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  project: any;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const id = this.route.snapshot.params.id;

    this.projectService.getProject(id).subscribe((data: any) => this.project = data);
  }

  isNumber(num) {
    return !isNaN(num);
  }

}
