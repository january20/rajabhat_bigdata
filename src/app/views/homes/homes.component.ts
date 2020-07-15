import { Component, OnInit } from '@angular/core';
import { HomesService } from './shared/homes.service';
@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {

  data:any[] = [];//[1,2,3,4,5,6,7,8,9,10,11,12];
  filtered:any[] = [];
  constructor(
    private home: HomesService
  ) { }



  ngOnInit() {
    this.fetchData();
  }

  onKeyUp(e){
    if(e.target.value == ""){
      this.filtered = this.data;
      return;
    }
    this.filtered = this.data.filter(function(f){
      return f.topic.indexOf(e.target.value) > -1;
    });
  }

  fetchData(){
    this.home.fetchHome().subscribe((data:any)=>{
      console.log(data);
      this.data = data;
      this.filtered = this.data;
    }, err=>{
      console.log(err);
    });
  }

  

}
