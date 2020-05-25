import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../school.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private school:SchoolService) { }
  schools: Array<Object>;

  lat = 14.882564;
  lng = 103.494215;
  ngOnInit() {
    this.loadSchools();
  }
  loadSchools(){
    this.school.loadSchools('สุรินทร์').subscribe((data:any)=>{
      this.schools = data;
      console.log(data);
    }, err=>{
      console.log(err);
    });
  }

  markerMouseOver(infoWindow, map) {

    if (map.lastOpen != null) {
      map.lastOpen.close();
    }

    map.lastOpen = infoWindow;

    infoWindow.open();
  }


}
