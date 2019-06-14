import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-assessor',
  templateUrl: './assessor.component.html',
  styleUrls: ['./assessor.component.scss']
})
export class AssessorComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() myEvaluationList;
  @Input() currentUser;
  displayedColumns: string[] = ['project_name', 'file', 'assessment'];
  dataSource: MatTableDataSource<any>;
  isDeleted = false;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.myEvaluationList.projects);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
