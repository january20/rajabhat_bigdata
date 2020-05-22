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
      //  bigDataChart.legend = new am4charts.Legend();
        bigDataChart.cursor = new am4charts.XYCursor();

        categoryAxis.dataFields.category = xField;
        categoryAxis.renderer.minGridDistance = 50;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.title.text = "เวลา";

        valueAxis.title.text = legendField;//this.field.iot_type_name_th+"("+this.field.unit+")";


        let series = bigDataChart.series.push(new am4charts.LineSeries());
        //let scrollbarX = new am4charts.XYChartScrollbar();
        //let interfaceColors = new am4core.InterfaceColorSet();

        series.dataFields.valueY = yField;
        series.dataFields.categoryX  = xField;
        series.strokeWidth = 2;
        series.tensionX = 0.77;
        series.fillOpacity = 0.5;
        //series.name = legendField;
        series.tooltipText = "{valueY}[/]";

        //bigDataChart.cursor = new am4charts.XYCursor();


      //  this.createAxisAndSeries(bigDataChart,xField,yField, legendField, bullet);

    });
  }
  createAxisAndSeries(bigDataChart,xField,yField, name, bullet) {
    this.zone.runOutsideAngular(() => {

      let series = bigDataChart.series.push(new am4charts.LineSeries());
      let scrollbarX = new am4charts.XYChartScrollbar();
      let interfaceColors = new am4core.InterfaceColorSet();

      series.dataFields.valueY = yField;
      series.dataFields.categoryX  = xField;
      series.strokeWidth = 2;
      series.tensionX = 0.77;
      series.name = name;
      series.tooltipText = "{valueY}[/]";

      bigDataChart.cursor = new am4charts.XYCursor();

      // let bullet = series.bullets.push(new am4charts.Bullet());
      // bullet.width = 5;
      // bullet.height = 5;
      // bullet.horizontalCenter = "middle";
      // bullet.verticalCenter = "middle";
      //
      // let rectangle = bullet.createChild(am4core.Rectangle);
      // rectangle.stroke = interfaceColors.getFor("background");
      // rectangle.strokeWidth = 1;
      // rectangle.width = 5;
      // rectangle.height = 5;

    });
  }


}
