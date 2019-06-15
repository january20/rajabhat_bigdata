import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { InfoService } from '../../shared/info.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ReferenceService } from 'src/app/shared/services/reference.service';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ready = false;
  isDataLoaded = false;
  districts = [];
  sub_districts = [];
  villages = [];
  displayedColumns: string[] = ['place_name', 'year60', 'year61'];
  dataSource: MatTableDataSource<any>;
  private chart: am4charts.XYChart;

  constructor(
    private zone: NgZone,
    private infoService: InfoService,
    private refService: ReferenceService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(query?) {
    this.isDataLoaded = false;

    this.refService.districts().subscribe((data: any) => this.districts = data);
    this.infoService.populationIncome(query).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
      });
      this.createChart(data);
      this.ready = true;
      this.isDataLoaded = true;
    });
  }

  loadSubDistricts(district_id) {
    this.refService.sub_districts(district_id).subscribe((data: any) => this.sub_districts = data);
  }

  filter(place_id, type) {
    place_id === 0 ? this.loadData() : this.loadData(`/${place_id}`);

    if(type === 1) {
      this.loadSubDistricts(place_id);
    }
  }

  createChart(data) {
    this.zone.runOutsideAngular(() => {
      let popChart = am4core.create("popChart", am4charts.XYChart)
      let categoryAxis = popChart.yAxes.push(new am4charts.CategoryAxis());
      let valueAxis = popChart.xAxes.push(new am4charts.ValueAxis());

      popChart.data = data;
      
      categoryAxis.dataFields.category = "place_name";
      categoryAxis.numberFormatter.numberFormat = "#";
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;

      valueAxis.renderer.opposite = true;
      valueAxis.renderer.maxLabelPosition = 0.9;
      
      this.createSeries(popChart, "y60", "2560");
      this.createSeries(popChart, "y61", "2561");

      this.chart = null;
      this.chart = popChart;
    });
  }

  createSeries(chart, field, year) {
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = field;
    series.dataFields.categoryY = "place_name";
    series.columns.template.tooltipText = 'ปี '+year+": รายได้เฉลี่ย [bold]{valueX}[/] บาท";
    series.columns.template.height = am4core.percent(100);
    series.sequencedInterpolation = true;

  
    let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
    categoryLabel.label.text = "{name}";
    categoryLabel.label.horizontalCenter = "right";
    categoryLabel.label.dx = -10;
    categoryLabel.label.fill = am4core.color("#fff");
    categoryLabel.label.hideOversized = false;
    categoryLabel.label.truncate = false;
  }

}
