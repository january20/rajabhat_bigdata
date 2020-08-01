import { Component, OnInit } from '@angular/core';
import { ReligiousService } from '../shared/religious.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";



@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  ready = false;
  loaded = true;
  site_count:any;
  districts:any[] = [];

  constructor(
    private religious: ReligiousService
  ) { }

  ngOnInit() {
    this.siteInfos();
  }

  siteInfos(){

    this.ready = false;
    this.religious.siteInfos().subscribe((data:any)=>{

      this.ready = true;
      console.log(data);
      this.site_count = data.site_count;
      this.createSemiCircleChart(data.sections);
      this.createClusteredColumn("clusteredColumn",data.districts);

    });

  }

  createClusteredColumn(chartId, data){

    let chart = am4core.create(chartId, am4charts.XYChart)
    chart.colors.step = 2;
    
    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95
    
    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'xField'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;
    
    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    chart.data =data;

    this.createSeries('sect1', 'มหานิกาย', chart);
    this.createSeries('sect2', 'ธรรมยุต', chart);
    

  }

  createSeries(value, name, chart) {
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = value;
    series.dataFields.categoryX = 'xField';
    series.name = name

    let bullet = series.bullets.push(new am4charts.LabelBullet())
    bullet.interactionsEnabled = false
    bullet.dy = 30;
    bullet.label.text = '{valueY}'
    bullet.label.fill = am4core.color('#ffffff')

    return series;
  }

  
  createSemiCircleChart(data){

    let chart = am4core.create("siteChart", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.data = data;

    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;  

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "yField";
    series.dataFields.category = "xField";


    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    //chart.legend = new am4charts.Legend();

  }

}
