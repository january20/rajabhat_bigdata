import { Component, OnInit, Inject } from '@angular/core';
import { FamiliesService } from '../shared/families.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-members-modal',
  templateUrl: './members-modal.component.html',
  styleUrls: ['./members-modal.component.scss']
})
export class MembersModalComponent implements OnInit {

  members: any;
  chief: any;
  currentUser: any;

  constructor(
    private familiesService: FamiliesService,
    private authService: AuthenticationService,
    private router: Router,    
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.familiesService.getMembers(this.data.family_id).subscribe((data: any) => {
      this.chief = data.chief;
      this.members = data.f_members;
    });
  }

  navigate(id, role) {
    this.dialogRef.close();
    this.router.navigate([`/families/${id}`, { role: role }]);
  }

  createHealth(id, role) {
    this.dialogRef.close();
    this.router.navigate([`/families/${id}/health/create`, { role: role }]);
  }

}
