import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  project: any;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.projectService.getProjectActivities(this.route.snapshot.params.id).subscribe(data => this.project = data);
  }

  deleteActivity(id) {
    if(confirm('คุณต้องการลบกิจกรรมนี้ใช่หรือไม่ ?')) {
      this.projectService.deleteActivity(id).subscribe(
        data => {
          this.snackBar.open('ลบโครงการสำเร็จ', '', {
            horizontalPosition: 'right',
            duration: 2000,
            panelClass: ['color-white', 'bg-success']
          });
          this.loadData();
        },
        err => {
          this.snackBar.open('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', '', {
            horizontalPosition: 'right',
            duration: 2000,
            panelClass: ['color-white', 'bg-danger']
          });
        }
      );
    }
  }

}
