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
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss']
})
export class AgeComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  rangeStart = '0';
  rangeEnd = '100';
  age_range = '';
  ready = false;
  isDataLoaded = false;
  districts = [];
  sub_districts = [];
  displayedColumns: string[] = ['year', 'dataset_male', 'dataset_female'];
  dataSource: MatTableDataSource<any>;
  place_id = '32';
  private chart: am4charts.XYChart;

  constructor(
    private zone: NgZone,
    private infoService: InfoService,
    private refService: ReferenceService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(query = '?t=range&start=0&end=100&place_id=32') {
    this.isDataLoaded = false;

    this.refService.districts().subscribe((data: any) => this.districts = data);
    this.infoService.populationAge(query).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
      });
      console.log(data);
      this.createChart(data);
      this.ready = true;
      this.isDataLoaded = true;
    });
  }

  loadSubDistricts(district_id) {
    this.refService.sub_districts(district_id).subscribe((data: any) => this.sub_districts = data);
  }

  filter(place_id, type) {
    if(type === 1)  this.loadSubDistricts(place_id);
    this.loadData(`?t=range&start=${this.rangeStart}&end=${this.rangeEnd}&place_id=${place_id}`);
    this.place_id = place_id;
  }

  filterRange() {
    const range = this.age_range.split('-');
    this.loadData(`?t=range&start=${range[0]}&end=${range[1]}&place_id=${this.place_id}`);
    this.rangeStart = range[0];
    this.rangeEnd = range[1];
  }

  createChart(data) {
    this.zone.runOutsideAngular(() => {
      let popChart = am4core.create("popChart", am4charts.XYChart)
      let categoryAxis = popChart.xAxes.push(new am4charts.CategoryAxis());
      let valueAxis = popChart.yAxes.push(new am4charts.ValueAxis());

      popChart.colors.step = 2;
      popChart.data = data;
      popChart.legend = new am4charts.Legend();
      popChart.cursor = new am4charts.XYCursor();
      popChart.events.on("datavalidated", function () {
        categoryAxis.zoomToIndexes(Math.round(popChart.data.length * 0.4), Math.round(popChart.data.length * 0.55));
      });

      categoryAxis.dataFields.category = "year";
      categoryAxis.renderer.minGridDistance = 50;
      categoryAxis.renderer.grid.template.location = 0;

      this.chart = null;
      this.chart = popChart;

      this.createAxisAndSeries("dataset_male", "ชาย", "triangle");
      this.createAxisAndSeries("dataset_female", "หญิง", "rectangle");

    });
  }

  createAxisAndSeries(field, name, bullet) {
    this.zone.runOutsideAngular(() => {
      let series = this.chart.series.push(new am4charts.LineSeries());
      let scrollbarX = new am4charts.XYChartScrollbar();
      let interfaceColors = new am4core.InterfaceColorSet();

      series.dataFields.valueY = field;
      series.dataFields.categoryX  = 'year';
      series.strokeWidth = 2;
      series.name = name;
      series.tooltipText = "{valueY}[/]";

      scrollbarX.series.push(series);
      this.chart.scrollbarX = scrollbarX;
      this.chart.cursor = new am4charts.XYCursor();

      switch(bullet) {
        case "triangle": {
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
        }
        case "rectangle": {
          let bullet = series.bullets.push(new am4charts.Bullet());
          bullet.width = 10;
          bullet.height = 10;
          bullet.horizontalCenter = "middle";
          bullet.verticalCenter = "middle";

          let rectangle = bullet.createChild(am4core.Rectangle);
          rectangle.stroke = interfaceColors.getFor("background");
          rectangle.strokeWidth = 2;
          rectangle.width = 10;
          rectangle.height = 10;
          break;
        }
        default:
          let bullet = series.bullets.push(new am4charts.CircleBullet());
          bullet.circle.stroke = interfaceColors.getFor("background");
          bullet.circle.strokeWidth = 2;
          break;
      }
    });
  }

}
