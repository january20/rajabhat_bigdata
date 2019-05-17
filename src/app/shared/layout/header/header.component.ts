import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currentUser;
  @Output() isLogout = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  logout() {
    this.isLogout.emit();
  }

}
