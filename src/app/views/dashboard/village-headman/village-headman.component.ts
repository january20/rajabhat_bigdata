import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-village-headman',
  templateUrl: './village-headman.component.html',
  styleUrls: ['./village-headman.component.scss']
})
export class VillageHeadmanComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() families;
  @Input() currentUser;
  @Output() projectDeleted = new EventEmitter<number>();
  displayedColumns: string[] = ['house_address', 'householder_name', 'family_members', 'manage'];
  dataSource: MatTableDataSource<any>;
  isDeleted = false;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.families);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteProject(id) {
    if(confirm('คุณต้องการลบครอบครัวนี้ใช่หรือไม่ ?')) {
      this.projectDeleted.emit(id);
    }
  }

}
