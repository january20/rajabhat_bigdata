import { Component, OnInit, NgZone } from '@angular/core';
import { HumanService } from '../shared/human.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";




@Component({
  selector: 'app-securities',
  templateUrl: './securities.component.html',
  styleUrls: ['./securities.component.scss']
})
export class SecuritiesComponent implements OnInit {

  ready = false;
  constructor(
    private human:HumanService,
    private zone: NgZone
  ) { }

  loaded = true;
  total:any;
  area:any[] = [];
  types:any[] = [];
  table:any[] = [];
  data:any;

  districts:any[] = [];
  sub_districts:any[] = [];

  ngOnInit() {
    this.loadAll();
    this.loadDistricts();
  }

  loadAll(){
    this.human.humanSecured().subscribe((data:any)=>{
      this.ready = true;
      this.total = data.total;
      console.log(data);
      this.types = data.types;
      this.table = data.area;
      this.data = data;//for reset 
      this.createChart(this.types,"mainChart","xField","yField");

      this.createAreaChart(this.table,"areaChart","xField","yField","XX","จำนวน (คน)");
    });
  }

  changeArea(id,type){
    console.log(id, type);
    this.loaded = false;
    if(type==1){
      this.sub_districts = [];
      if(id == 0){
        //reset 
        this.table = this.data.area;
        this.createAreaChart(this.table,"areaChart","xField","yField","XX","จำนวน (คน)");
        this.loaded = true;
      }else{
        this.loadSubDistrict(id);
        this.loadDistrictTable(id);
      }
    }else{

      this.loadSubDistrictTable(id);

    }
  }
  loadSubDistrictTable(sub_district_id){
    this.human.subDistrictTable(sub_district_id).subscribe((data:any)=>{
      this.table = data;
      this.createAreaChart(this.table,"areaChart","xField","yField","XX","จำนวน (คน)");
      this.loaded = true;
    });
  }
  loadDistrictTable(district_id){
    this.human.districtTable(district_id).subscribe((data:any)=>{
      this.table = data;
      this.createAreaChart(this.table,"areaChart","xField","yField","XX","จำนวน (คน)");
      this.loaded = true;
    });
  }
  loadSubDistrict(district_id){
    
    this.human.subDistricts(district_id).subscribe((data:any)=>{
      console.log(data);
      this.sub_districts = data;
    });

  }
  loadDistricts(){
    this.human.districts(32).subscribe((data:any)=>{
      this.districts = data;
    });
  }

  createAreaChart(data,chartId,xField,yField,xlabel,ylabel){


    this.zone.runOutsideAngular(() => {

      let chart = am4core.create(chartId, am4charts.XYChart);
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      chart.data = data;
      chart.cursor = new am4charts.XYCursor();
      categoryAxis.dataFields.category = xField;
      categoryAxis.renderer.minGridDistance = 50;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.labels.template.rotation = 270;
      //categoryAxis.title.text = xlabel;
      valueAxis.title.text = ylabel;
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = yField;
      series.dataFields.categoryX  = xField;
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.tooltipText = "{valueY}[/]";
      var labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.verticalCenter = "middle";
      labelBullet.label.dy = -10;
      labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

      chart.zoomOutButton.disabled = true;

    });

  }

  createChart(data,chartId,xField,yField) {
    this.zone.runOutsideAngular(() => {

      let chart = am4core.create(chartId, am4charts.PieChart);
      chart.data = data;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = yField;
      pieSeries.dataFields.category = xField;
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      chart.legend = new am4charts.Legend();
      //chart.cursor = new am4charts.XYCursor();
  
  

    });
  }

}
