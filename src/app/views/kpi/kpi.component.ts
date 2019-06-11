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

  ready = false;
  srru_kpis:any;

  srru_strategies:string[] = ["Y1","Y2","Y3"];

  //srru_strategies_data: MatTableDataSource<any>;
  private srru_strategies_chart: am4charts.XYChart;

  kpi_year:Number = 2018;

  constructor(
    private zone: NgZone,
    private kpi:KpiService
  ) { }

  ngOnInit() {

    this.kpi.srru_strategies(2018).subscribe(data=>{
      this.srru_kpis = data;
    });

    this.kpi.srru_strategies_chart(2018).subscribe(data=>{
      console.log(data);
    });

     //this.srru_strategies_data = new MatTableDataSource([100,200,300]);
     this.ready = true;
  }

}
