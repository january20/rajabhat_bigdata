import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-otop',
  templateUrl: './all-otop.component.html',
  styleUrls: ['./all-otop.component.scss']
})
export class AllOtopComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() adminOtopList;
  @Output() otopDeleted = new EventEmitter<number>();
  displayedColumns: string[] = ['name', 'category', 'subDistrict', 'manage'];
  dataSource: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.adminOtopList);
    setTimeout(() => {
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'category': return item.category_id;
          case 'subDistrict': return item.sub_district_id;
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

  deleteOtop(id) {
    this.otopDeleted.emit(id);
  }

}
