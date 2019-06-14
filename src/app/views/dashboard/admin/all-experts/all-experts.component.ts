import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-experts',
  templateUrl: './all-experts.component.html',
  styleUrls: ['./all-experts.component.scss']
})
export class AllExpertsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() adminExpertList;
  @Output() expertDeleted = new EventEmitter<number>();
  displayedColumns: string[] = ['name', 'expertType', 'expertise', 'manage'];
  dataSource: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.adminExpertList);
    setTimeout(() => {
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'name': return item.sys_user.firstname;
          case 'expertType': return item.expert_type;
          case 'expertise': return item.experties_id;
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

  deleteExpert(id) {
    this.expertDeleted.emit(id);
  }

}
