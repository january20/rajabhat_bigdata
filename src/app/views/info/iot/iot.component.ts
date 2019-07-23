import { Component, OnInit } from '@angular/core';
import { InfoService } from '../shared/info.service';
import { ActivatedRoute } from '@angular/router';
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

  years = Array.from({length: 24}, (v, k) => k + 1);
  data: any;
  isDataLoaded = false;
  previous = 12;
  private chart: am4charts.XYChart;

  constructor(
    private infoService: InfoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData(this.previous);
  }

  changePrevious(previous) {
    this.loadData(previous);
  }

  loadData(previous) {
    this.isDataLoaded = false;

    this.infoService.iotShow(this.route.snapshot.params.id, previous).subscribe((data: any) => {
      this.data = data;
      this.previous = previous;
      this.isDataLoaded = true;
      this.createCharts(data);
    })
  }
  
  createCharts(data) {
    setTimeout(() => {
      let iotChart = am4core.create("iotChart", am4charts.XYChart)
      let dateAxis = iotChart.xAxes.push(new am4charts.DateAxis());
      let valueAxis = iotChart.yAxes.push(new am4charts.ValueAxis());
      let series = iotChart.series.push(new am4charts.LineSeries());
      let gradient = new am4core.LinearGradient();

      iotChart.data = data.data.map((d: any) => {
        d.date = new Date(d.created_at)
        return d;
      });
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      }
      dateAxis.renderer.inside = true;
      dateAxis.renderer.minGridDistance = 50;
      series.dataFields.valueY = data.iot_type.field;
      series.dataFields.dateX = "date";
      series.tooltipText = "{value}"
      series.fillOpacity = 0.5;
      series.strokeWidth = 1;

      iotChart.cursor = new am4charts.XYCursor();
      iotChart.cursor.behavior = "panXY";
      iotChart.cursor.xAxis = dateAxis;
      iotChart.cursor.snapToSeries = series;

      dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
        let dataItem: any = target.dataItem;
        if (dataItem.date && dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute", 1).getTime()) {
          target.verticalCenter = "middle";
          target.horizontalCenter = "left";
          return -90;
        }
        else {
          target.verticalCenter = "bottom";
          target.horizontalCenter = "middle";
          return 0;
        }
      });

      this.chart = null;
      this.chart = iotChart;
    });
  }

}
