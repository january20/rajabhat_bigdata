import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() adminProjectList;
  @Output() projectDeleted = new EventEmitter<number>();
  displayedColumns: string[] = ['status', 'project_name', 'faculty', 'budget', 'manage', 'result'];
  dataSource: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.adminProjectList);
    setTimeout(() => {
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'faculty': return item.fac_id;
          default: return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProject(id) {
    this.projectDeleted.emit(id);
  }

}
