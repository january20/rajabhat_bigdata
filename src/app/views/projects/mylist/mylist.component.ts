import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {

  projects: any;

  constructor(
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.projectService.getMyProjectList().subscribe(projects => this.projects = projects);
  }

  deleteProject(id) {
    if(confirm('คุณต้องการลบโปรเจ็คนี้ใช่หรือไม่ ?')) {
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

}
