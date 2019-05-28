import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
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
    private router: Router
  ) { }

  ngOnInit() {    
    this.currentUser = this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['home']).then(() => location.reload(true));
  }

}
