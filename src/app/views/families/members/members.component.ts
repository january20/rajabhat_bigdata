import { Component, OnInit, Inject } from '@angular/core';
import { FamiliesService } from '../shared/families.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members: any;
  chief: any;

  constructor(
    private familiesService: FamiliesService,    
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.familiesService.getMembers(this.data.family_id).subscribe((data: any) => {
      this.chief = data.chief;
      this.members = data.f_members;
    })
  }

}
