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
  isDataLoaded:boolean = true;
  duration:any;
  stations:any;
  duration_label:string = "เลือกข้อมูลย้อนหลัง";
  current_station:any;// = 0;
  current_duration:any;// = 0;

  constructor(
    private zone: NgZone,
    private infoService: InfoService
  ){ }
  ngOnInit() {
    this.getStations();
  }
  getStations(){
    this.infoService.weatherStations().subscribe(data=>{
      this.stations = data;
      this.current_station = this.stations[0];
      this.editRaiseButton();

      this.getDuration();
    });
  }
  getDuration(){
    this.infoService.weatherDuration().subscribe(data=>{
      //console.log(data);
      this.duration = data;
      this.current_duration = this.duration[0];
      this.getWeatherPeriod(this.current_duration)
    });
  }

  getWeatherPeriod(duration){

    this.isDataLoaded = false;
    this.duration_label = duration.duration_txt;
    this.current_duration = duration;
    console.log(this.current_duration);
    console.log(this.current_station);

    this.infoService.weatherPeriod(this.current_station.id,duration.id).subscribe(data=>{
      //console.log(data);

      this.createChart(data,"temperatureChart","name","avg_temp","อุณหภูมิ (C)","rectangle");
      this.createChart(data,"humidityChart","name","humidity","ความชื้น (rH)","triangle");
      this.createChart(data,"windSpeedChart","name","wind_speed","ความเร็วลม (m/s)","rectangle");
      this.ready = true;
      this.isDataLoaded = true;
    });
  }
  changeStation(station){
    this.isDataLoaded = false;
    this.current_station = station;
    console.log(this.current_station);
    this.editRaiseButton();
    this.getWeatherPeriod(this.current_duration);
  }

  editRaiseButton(){
    this.stations.forEach((st,i)=>{
      if(st.id==this.current_station.id){
        st.raised = true;
      }else{
        st.raised = false;
      }
    })
  }


  createChart(data,chartId,xField,yField,legendField,bullet) {
      this.zone.runOutsideAngular(() => {
        let bigDataChart = am4core.create(chartId, am4charts.XYChart);
        let categoryAxis = bigDataChart.xAxes.push(new am4charts.CategoryAxis());
        let valueAxis = bigDataChart.yAxes.push(new am4charts.ValueAxis());

        bigDataChart.colors.step = 2;
        bigDataChart.data = data;
        bigDataChart.legend = new am4charts.Legend();
        bigDataChart.cursor = new am4charts.XYCursor();
        // bigDataChart.events.on("datavalidated", function () {
        // //  categoryAxis.zoomToIndexes(Math.round(bigDataChart.data.length * 0.4), Math.round(bigDataChart.data.length * 0.55));
        // });

        categoryAxis.dataFields.category = xField;
        categoryAxis.renderer.minGridDistance = 50;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.labels.template.rotation = 270;

        this.createAxisAndSeries(bigDataChart,xField,yField, legendField, bullet);
        // this.createAxisAndSeries("dataset_female", "หญิง", "rectangle");

    });
  }
  createAxisAndSeries(bigDataChart,xField,yField, name, bullet) {
    this.zone.runOutsideAngular(() => {
      let series = bigDataChart.series.push(new am4charts.LineSeries());
      let scrollbarX = new am4charts.XYChartScrollbar();
      let interfaceColors = new am4core.InterfaceColorSet();

      series.dataFields.valueY = yField;
      series.dataFields.categoryX  = xField;
      series.strokeWidth = 0.8;
      series.name = name;
      series.tooltipText = "{valueY}[/]";

      // scrollbarX.series.push(series);
      // bigDataChart.scrollbarX = scrollbarX;
      bigDataChart.cursor = new am4charts.XYCursor();

      switch(bullet) {
        case "triangle": {
          let bullet = series.bullets.push(new am4charts.Bullet());
          bullet.width = 8;
          bullet.height = 8;
          bullet.horizontalCenter = "middle";
          bullet.verticalCenter = "middle";

          let triangle = bullet.createChild(am4core.Triangle);
          triangle.stroke = interfaceColors.getFor("background");
          triangle.strokeWidth = 1;
          triangle.direction = "top";
          triangle.width = 6;
          triangle.height = 6;
          break;
        }
        case "rectangle": {
          let bullet = series.bullets.push(new am4charts.Bullet());
          bullet.width = 5;
          bullet.height = 5;
          bullet.horizontalCenter = "middle";
          bullet.verticalCenter = "middle";

          let rectangle = bullet.createChild(am4core.Rectangle);
          rectangle.stroke = interfaceColors.getFor("background");
          rectangle.strokeWidth = 1;
          rectangle.width = 5;
          rectangle.height = 5;
          break;
        }
        default:
          let bullet = series.bullets.push(new am4charts.CircleBullet());
          bullet.width = 5;
          bullet.height = 5;
          bullet.circle.stroke = interfaceColors.getFor("background");
          bullet.circle.strokeWidth = 1;
          break;
      }
    });
  }


}
