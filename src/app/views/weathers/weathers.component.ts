import { Component, OnInit } from '@angular/core';
import { WeatherService } from './shared/weather.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


@Component({
  selector: 'app-weathers',
  templateUrl: './weathers.component.html',
  styleUrls: ['./weathers.component.scss']
})
export class WeathersComponent implements OnInit {

  constructor(
    private weather: WeatherService
  ) { }

  series:any[] = [];
  weeks:any[] = [];
  loaded=true;

  stations:any[] = [];
  current_station:any;
  station_weeks:any[] = [];

  ready = false;

  ngOnInit() {
    this.loadStations();
  }
  loadStations(){
    this.weather.loadStations().subscribe((data:any)=>{
      console.log(data);
      this.stations = data;
      
      this.rain();
    });
  }

  changeStation(id, force=true){

    console.log(id);
    //if(id!=this.current_station.id && !force){
      this.loaded = false;

      this.weather.loadStationId(id).subscribe((data:any)=>{
        this.loaded = true;
        console.log(data);

        this.current_station = data.current;
        this.station_weeks = data.weeks;


        this.createMainChart("districtChart",this.station_weeks);
      }, err=>{
        this.loaded = true;
      });

    //}

  }

  
  rain(){
    this.weather.loadRain().subscribe((data:any)=>{
      console.log(data);
      this.series = data.series;
      this.weeks = data.weeks;
      this.current_station = data.current;
      this.changeStation(this.current_station.id, false);
      this.ready = true;
      this.createMainChart("mainChart", this.weeks);
    }, err=>{

    });
  }

  createMainChart(chartId, data){
    let chart = am4core.create(chartId, am4charts.XYChart);
    chart.colors.step = 2;
    chart.data = data;
    chart.cursor = new am4charts.XYCursor();

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "xField";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.rotation = 270;

    let i = 0;
    let bullets = ['triangle', 'rectangle', 'circle']

    this.series.forEach((SSSSS)=>{
      console.log(SSSSS);
      this.createAxisAndSeries(chart,SSSSS,SSSSS,bullets[i%3]);
      i++;
    });

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();


  }

  createAxisAndSeries(chart, field, name, bullets) {
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    if(chart.yAxes.indexOf(valueAxis) != 0){
      valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
    }
    
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    //series.dataFields.dateX = "xField";
    series.dataFields.categoryX  = "xField";
    series.strokeWidth = 2;
    //series.yAxis = valueAxis;
    series.name = name;
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    //series.tensionX = 0.8;
   // series.showOnInit = true;
    
    let interfaceColors = new am4core.InterfaceColorSet();
    
    switch(bullets) {
      case "triangle":
        let bullet = series.bullets.push(new am4charts.Bullet());
        bullet.width = 12;
        bullet.height = 12;
        bullet.horizontalCenter = "middle";
        bullet.verticalCenter = "middle";
        
        let triangle = bullet.createChild(am4core.Triangle);
        triangle.stroke = interfaceColors.getFor("background");
        triangle.strokeWidth = 2;
        triangle.direction = "top";
        triangle.width = 12;
        triangle.height = 12;
        break;
      case "rectangle":
        let bullet2 = series.bullets.push(new am4charts.Bullet());
        bullet2.width = 10;
        bullet2.height = 10;
        bullet2.horizontalCenter = "middle";
        bullet2.verticalCenter = "middle";
        
        let rectangle = bullet2.createChild(am4core.Rectangle);
        rectangle.stroke = interfaceColors.getFor("background");
        rectangle.strokeWidth = 2;
        rectangle.width = 10;
        rectangle.height = 10;
        break;
      default:
        let bullet3= series.bullets.push(new am4charts.CircleBullet());
        bullet3.circle.stroke = interfaceColors.getFor("background");
        bullet3.circle.strokeWidth = 2;
        break;
    }
    
    //valueAxis.renderer.line.strokeOpacity = 1;
    //valueAxis.renderer.line.strokeWidth = 2;
    //valueAxis.renderer.line.stroke = series.stroke;
    //valueAxis.renderer.labels.template.fill = series.stroke;
    //valueAxis.renderer.opposite = opposite;
  }

}
