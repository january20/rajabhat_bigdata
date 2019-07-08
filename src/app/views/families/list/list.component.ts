import { Component, OnInit, ViewChild } from '@angular/core';
import { FamiliesService } from '../shared/families.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MembersModalComponent } from '../members-modal/members-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  families: any;
  displayedColumns: string[] = ['house_address', 'householder_name', 'family_members', 'manage'];
  dataSource: MatTableDataSource<any>;
  isDeleted = false;

  constructor(
    private familiesService: FamiliesService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.familiesService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  openMembers(family_id) {
    const dialogRef = this.dialog.open(MembersModalComponent, {
      width: '50%',
      data: { family_id: family_id }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.router.navigate([`/families/${result.id}`, { role: result.role }]);
    // })
  }

  createFamily() {
    this.router.navigate(['families/create']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFamily(id) {
    if(confirm('คุณต้องการลบครอบครัวนี้ใช่หรือไม่ ?')) {
      this.isDeleted = true;

      this.familiesService.destroy(id).subscribe(res => {
        this.loadData();
        this.isDeleted = false;
      });
    }
  }

}
