import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { InfoService } from '../../shared/info.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  ready:boolean = false;
  duration:any;
  constructor(
    private zone: NgZone,
    private infoService: InfoService
  ){ }
  ngOnInit() {
    this.infoService.weatherDuration().subscribe(data=>{
      console.log(data);
      this.duration = data;
      this.getWeatherPeriod(1)

    });

  }

  getWeatherPeriod(duration_id){
    console.log("GET"+duration_id);
    this.infoService.weatherDuration(duration_id).subscribe(data=>{
      console.log(data);
    });
  }


}
