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
  @ViewChild(MatPaginator, { static: false }) vpaginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() myProjectList;
  @Input() myVillageList;

  @Input() currentUser;
  @Output() projectDeleted = new EventEmitter<number>();
  // displayedColumns: string[] = ['status', 'project_name', 'file', 'activity', 'manage','result'];
  displayedColumns: string[] = ['year', 'project_name'];
  dataSource: MatTableDataSource<any>;
  isDeleted = false;

  vdisplayedColumns: string[] = ['vname', 'sub_district','district','province','inspect'];
  vdataSource: MatTableDataSource<any>;

  constructor() { }


  waitVllages(){
    if(this.myVillageList !=null ){
      console.log(this.myVillageList);
      this.vdataSource = new MatTableDataSource(this.myVillageList);
      //this.vdataSource.sort = this.sort;
      this.vdataSource.paginator = this.vpaginator;
      return;
    }else{
      setTimeout(()=>{
        this.waitVllages();
      },1000);
    }
  }
  waitProjects(){
    if(this.myProjectList !=null ){
      console.log(this.myProjectList);
      this.dataSource = new MatTableDataSource(this.myProjectList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      return;
    }else{
      setTimeout(()=>{
        this.waitProjects();
      },1000);
    }

  }

  ngOnInit() {

    this.waitProjects();
    this.waitVllages();

    // this.dataSource = new MatTableDataSource(this.myProjectList);
    // setTimeout(() => {
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // });




  }

  deleteProject(id) {
    if(confirm('คุณต้องการลบโครงการนี้ใช่หรือไม่ ?')) {
      this.projectDeleted.emit(id);
    }
  }

}
