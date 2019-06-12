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
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  ready = false;
  isDataLoaded = false;
  districts = [];
  sub_districts = [];
  villages = [];
  displayedColumns: string[] = ['name_th', 'families_count'];
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
    this.infoService.populationEducation(query).subscribe((data: any) => {
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

  loadVillages(sub_district_id) {
    this.refService.villages(sub_district_id).subscribe((data: any) => this.villages = data);
  }

  filter(place_id, type) {
    this.loadData(`/${place_id}`);

    if(type === 1) {
      this.loadSubDistricts(place_id);
    } else if(type === 2) {
      this.loadVillages(place_id);
    }
  }

  createChart(data) {
    this.zone.runOutsideAngular(() => {
      let popChart = am4core.create("popChart", am4charts.XYChart)
      let categoryAxis = popChart.xAxes.push(new am4charts.CategoryAxis());
      let valueAxis = popChart.yAxes.push(new am4charts.ValueAxis());
      let series = popChart.series.push(new am4charts.ColumnSeries());

      popChart.data = data;
      popChart.scrollbarX = new am4core.Scrollbar();

      categoryAxis.dataFields.category = "name_th";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      valueAxis.renderer.minWidth = 50;

      series.sequencedInterpolation = true;
      series.dataFields.valueY = "families_count";
      series.dataFields.categoryX = "name_th";
      series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
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
        return popChart.colors.getIndex(target.dataItem.index);
      });

      popChart.cursor = new am4charts.XYCursor();

      this.chart = null;
      this.chart = popChart;
    });
  }


}
