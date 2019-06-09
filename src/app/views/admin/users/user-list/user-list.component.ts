import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.adminService.getUserList().subscribe(data => this.users = data);
  }

}
