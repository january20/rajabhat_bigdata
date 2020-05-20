import { Component, OnInit, NgZone, ViewChild } from '@angular/core';

import { SurinService } from './surin.service'


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-iot',
  templateUrl: './iot.component.html',
  styleUrls: ['./iot.component.scss']
})
export class IotComponent implements OnInit {

  constructor(private surin:SurinService, private zone: NgZone) { }

  income:any;
  sub_districts:any;

  ngOnInit() {

    this.surin.sub_districts(3204).subscribe((data:any)=>{
      this.sub_districts = data;
    });

  }

  testClick(sub_district_id=320403){
      console.log("sub_district_id=>"+sub_district_id);
      this.surin.population(sub_district_id).subscribe((data:any) =>{
        console.log(data);
        this.createChart(data,"populationChart","year","total","ประชากร","rectangle");

      });
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

        categoryAxis.dataFields.category = xField;
        categoryAxis.renderer.minGridDistance = 50;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.labels.template.rotation = 270;

        this.createAxisAndSeries(bigDataChart,xField,yField, legendField, bullet);

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

      bigDataChart.cursor = new am4charts.XYCursor();

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

    });
  }











}
