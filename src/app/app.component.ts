import { Component, OnInit } from '@angular/core';
import { Role } from './shared/models/role';
import { AuthenticationService } from './shared/services/authentication.service';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SRRU Big Data';
  currentUser: any;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.checkToken().subscribe(
      res => this.currentUser = this.authService.currentUserValue,
      error => this.authService.logout()
    );
  }

  logout() {
    this.authService.logout();
    location.href = '/home';
  }

}
