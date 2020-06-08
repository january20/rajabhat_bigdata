import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../school.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private school:SchoolService) { }
  schools: any[] = [];
  groups:any[] = [];
  ready = false;
  selected:string = 'ทั้งหมด';

  lat = 14.882564;
  lng = 103.494215;

  ngOnInit() {
    this.loadSchoolGroups();
    this.loadSchools();
  }
  loadSchools(){
    this.schools = [];
    //this.ready = false;
    this.school.loadSchools('สุรินทร์',this.selected).subscribe((data:any)=>{
      this.schools = data;
      console.log(data);
      this.ready = true;
    }, err=>{
      console.log(err);
    });
  }

  loadSchoolGroups(){
    this.school.loadSchooGroups().subscribe((data:any)=>{
      this.groups = data;
      console.log(data);
    }, err=>{
      
    });
  }
  changeGroup(event){
    console.log(event);
    this.selected = event;
    this.loadSchools();
  }

  markerMouseOver(infoWindow, map) {
    try{
      if (map.lastOpen != null) {
        map.lastOpen.close();
      }
      map.lastOpen = infoWindow;
      infoWindow.open();

    }catch(e){
      console.log("Error=>",e);
    }
  }
}
