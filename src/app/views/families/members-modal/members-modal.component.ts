import { Component, OnInit, Inject } from '@angular/core';
import { FamiliesService } from '../shared/families.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-members-modal',
  templateUrl: './members-modal.component.html',
  styleUrls: ['./members-modal.component.scss']
})
export class MembersModalComponent implements OnInit {

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
