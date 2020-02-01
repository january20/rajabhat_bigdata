import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { merge, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, switchMap, map, catchError } from 'rxjs/operators';
import { FamiliesService } from '../shared/families.service';
import { ActivatedRoute } from '@angular/router';
import { MembersModalComponent } from '../members-modal/members-modal.component';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['house_address', 'householder_name', 'family_members', 'manage'];
  dataSource: MatTableDataSource<any>;
  searchTerm = new FormControl('');
  resultLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  isDeleted = false;
  vid: number;

  constructor(
    private _route: ActivatedRoute,
    private _familiesService: FamiliesService,
    // private _dialog: MatDialog
  ) { 
    this.vid = _route.snapshot.params.vid;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    merge(this.paginator.page, this.searchTerm.valueChanges.pipe(debounceTime(500))).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;

        return this._familiesService!.getWithVid(this.vid, this.searchTerm.value, this.paginator.pageSize, this.paginator.pageIndex);
      }),
      map((res: any) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultLength = res.total;

        return res.data;
      }),
      catchError(error => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return of([]);
      })
    ).subscribe(data => this.dataSource = data);
  }

  // openMembers(family_id) {
  //   const dialogRef = this._dialog.open(MembersModalComponent, {
  //     width: '50%',
  //     data: { family_id: family_id }
  //   });
  // }

  deleteFamily(id) {
    if(confirm('คุณต้องการลบครอบครัวนี้ใช่หรือไม่ ?')) {
      this.isDeleted = true;

      this._familiesService.destroy(id).subscribe(res => {
        this.searchTerm.patchValue('');
        this.isDeleted = false;
      });
    }
  }

}
