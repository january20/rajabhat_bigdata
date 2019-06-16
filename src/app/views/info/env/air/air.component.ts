import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { InfoService } from '../../shared/info.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-air',
  templateUrl: './air.component.html',
  styleUrls: ['./air.component.scss']
})

export class AirComponent implements OnInit {

  lat = 14.882564;
  lng = 103.494215;
  stations:any;
  data:any;
  ready:boolean = false;

  isDataLoaded:boolean = false;

  constructor(

    private infoService: InfoService,
      private zone: NgZone
  ) {

  }

  ngOnInit() {
    this.infoService.airQuality().subscribe((data:any)=>{
      //console.log(data);
      if(data.stations){
        console.log(data.stations);
        this.stations = data.stations;
        console.log(data.data);
        this.data = data.data;
        this.ready = true;
        this.createChart(this.data,'windSpeedChart','xField','station_4',"xx",'triangle');

      }

    });
  }

  createChart(data,chartId,xField,yField,legendField,bullet) {
      this.zone.runOutsideAngular(() => {
        console.log("Trying to create chart....");
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

        this.stations.forEach((sta,i)=>{
          console.log(sta);
          this.createAxisAndSeries(bigDataChart,xField,sta.col_name, sta.name, "triangle");
        });


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
      
    });
  }


}
