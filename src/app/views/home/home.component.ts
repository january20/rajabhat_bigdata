import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  googleMapOptions = {
    lat: 14.882564,
    lng: 103.494215,
    zoom: 9.6,
  }

  constructor() { }

  ngOnInit() {
  }

}
