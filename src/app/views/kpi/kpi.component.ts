import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { KpiService } from './shared/kpi.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  kpi_year:number = 2018;
  project_summary:any;
  srru_kpis:any;

  constructor(
    private zone: NgZone,
    private kpi:KpiService
  ) { }

  ngOnInit() {

    this.loadData();

  }

  loadData(){
    this.kpi.srru_strategies(this.kpi_year).subscribe(data=>{
      this.srru_kpis = data;
    });

    this.kpi.srru_strategies_chart(this.kpi_year).subscribe(data=>{
      this.createChart(data,"srruStrategyChart","name","projects","info");
    });

    this.kpi.rajabhat_strategies_chart(this.kpi_year).subscribe(data=>{
      this.createChart(data,"rajabhatStrategyChart","name","projects","info");
    });

    this.kpi.national_strategies_chart(this.kpi_year).subscribe(data=>{
      this.createChart(data,"nationalStrategyChart","name","projects","info");
    });

    this.kpi.project_schemes_chart(this.kpi_year).subscribe(data=>{
      this.createChart(data,"projectSchemesChart","name","projects","info");
    });
    this.kpi.project_benefits_chart(this.kpi_year).subscribe(data=>{
      this.createChart(data,"projectBenefitsChart","name","projects","info");
    });

    this.kpi.project_summary().subscribe(data=>{
       console.log(data);
       this.project_summary = data;
    });
//project_benefits_chart
  }

  createChart(data,chartId,xField,yField,infoField) {
    this.zone.runOutsideAngular(() => {
      let bigDataChart = am4core.create(chartId, am4charts.XYChart)
      let categoryAxis = bigDataChart.xAxes.push(new am4charts.CategoryAxis());
      let valueAxis = bigDataChart.yAxes.push(new am4charts.ValueAxis());
      let series = bigDataChart.series.push(new am4charts.ColumnSeries());

      bigDataChart.data = data;
      bigDataChart.scrollbarX = new am4core.Scrollbar();

      categoryAxis.dataFields.category = xField;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      valueAxis.renderer.minWidth = 50;

      series.sequencedInterpolation = true;
      series.dataFields.valueY = yField;
      //series.dataFields.valueYShow = infoField;
      series.dataFields.categoryX = xField;
      series.tooltipText = "[{categoryX}: bold]{info}[/]";
      series.columns.template.strokeWidth = 0;
      series.tooltip.pointerOrientation = "vertical";
      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.fillOpacity = 0.8;

      let hoverState = series.columns.template.column.states.create("hover");

      hoverState.properties.cornerRadiusTopLeft = 0;
      hoverState.properties.cornerRadiusTopRight = 0;
      hoverState.properties.fillOpacity = 1;

      series.columns.template.adapter.add("fill", function(fill, target) {
        return bigDataChart.colors.getIndex(target.dataItem.index);
      });

      bigDataChart.cursor = new am4charts.XYCursor();

    });
  }

}
