import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-srru-personnel',
  templateUrl: './srru-personnel.component.html',
  styleUrls: ['./srru-personnel.component.scss']
})
export class SrruPersonnelComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() myProjectList;
  @Input() currentUser;
  @Output() projectDeleted = new EventEmitter<number>();
  displayedColumns: string[] = ['status', 'project_name', 'file', 'activity', 'manage','result'];
  dataSource: MatTableDataSource<any>;
  isDeleted = false;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.myProjectList);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteProject(id) {
    if(confirm('คุณต้องการลบโครงการนี้ใช่หรือไม่ ?')) {
      this.projectDeleted.emit(id);
    }
  }

}
