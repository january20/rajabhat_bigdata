import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {

  projects: any;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.projectService.getMyProjectList().subscribe(projects => this.projects = projects);
  }

}
