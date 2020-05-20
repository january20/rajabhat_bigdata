import { Component, OnInit, NgZone} from '@angular/core';
import { InfoService } from '../shared/info.service';
import { ActivatedRoute } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-iot',
  templateUrl: './iot.component.html',
  styleUrls: ['./iot.component.scss']
})
export class IotComponent implements OnInit {

  years = Array.from({length: 48}, (v, k) => k + 1);
  data: any;
  isDataLoaded = false;
  previous = 24;
  hr = 24;
  yField:any;
  private chart: am4charts.XYChart;

  constructor(
    private infoService: InfoService,
    private route: ActivatedRoute,
    private zone: NgZone
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.field, this.route.snapshot.params.id);
    this.loadData(this.hr);
  }

  changePrevious(hr) {
    console.log(hr);
    this.loadData(hr);
  }

  loadData(hr) {
    this.isDataLoaded = false;
    this.yField = this.route.snapshot.params.field
    this.infoService.loadIotData(this.route.snapshot.params.id, this.yField, hr).subscribe((data:any)=>{
      console.log(data);
      this.isDataLoaded  = true;
      this.createCharts(data);
    });

    // this.infoService.iotShow(this.route.snapshot.params.id, previous).subscribe((data: any) => {
    //   this.data = data;
    //   this.previous = previous;
    //   this.isDataLoaded = true;
    //
    //   // if(previous === 'w') this.createCharts(data, 'w');
    //   if(previous === 'm') this.createCharts(data, 'm');
    //   else if(previous === 'y') this.createCharts(data, 'y');
    //   else this.createCharts(data);
    // })
  }

  createCharts(data) {

    this.zone.runOutsideAngular(() => {

      let chart = am4core.create("iotChart", am4charts.XYChart)
      let categoryAxis = chart.xAxes.push(  new am4charts.CategoryAxis() );
      let valueAxis = chart.yAxes.push( new am4charts.ValueAxis() );
      let series = chart.series.push( new am4charts.LineSeries() );
      let gradient = new am4core.LinearGradient();

      chart.data = data;

      //console.log(yField, xField);

      series.dataFields.valueY = this.yField;
      series.dataFields.categoryX  = 'xField';
      series.tooltipText = "{value}"
      series.fillOpacity = 0.5;
      series.strokeWidth = 1;

      categoryAxis.dataFields.category = 'xField';
      categoryAxis.renderer.minGridDistance = 50;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.labels.template.rotation = 270;

      series.tooltipText = "{value}"
      //series.fillOpacity = 0.5;
      series.strokeWidth = 1;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "panXY";
      chart.cursor.xAxis = categoryAxis;
      chart.cursor.snapToSeries = series;

    });


    // setTimeout(() => {
    //   let iotChart = am4core.create("iotChart", am4charts.XYChart)
    //   let dateAxis = iotChart.xAxes.push(new am4charts.DateAxis());
    //   let valueAxis = iotChart.yAxes.push(new am4charts.ValueAxis());
    //   let series = iotChart.series.push(new am4charts.LineSeries());
    //   let gradient = new am4core.LinearGradient();
    //
    //   console.log(type);
    //
    //   if(type === 'm') {
    //     iotChart.data = data.data;
    //   } else if(type === 'y') {
    //     iotChart.data = data.data.map((d: any) => {
    //       d.date = d.month
    //       return d;
    //     });
    //   } else {
    //     iotChart.data = data.data.map((d: any) => {
    //       d.date = new Date(d.created_at)
    //       return d;
    //     });
    //
    //     dateAxis.baseInterval = {
    //       "timeUnit": "minute",
    //       "count": 1
    //     }
    //   }
    //
    //
    //   dateAxis.renderer.inside = true;
    //   dateAxis.renderer.minGridDistance = 50;
    //   series.dataFields.valueY = type ? 'sum_' + data.iot_type.field : data.iot_type.field;
    //   series.dataFields.dateX = "date";
    //   series.tooltipText = "{value}"
    //   series.fillOpacity = 0.5;
    //   series.strokeWidth = 1;
    //
    //   iotChart.cursor = new am4charts.XYCursor();
    //   iotChart.cursor.behavior = "panXY";
    //   iotChart.cursor.xAxis = dateAxis;
    //   iotChart.cursor.snapToSeries = series;
    //
    //   dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
    //     let dataItem: any = target.dataItem;
    //     if (dataItem.date && dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute", 1).getTime()) {
    //       target.verticalCenter = "middle";
    //       target.horizontalCenter = "left";
    //       return -90;
    //     }
    //     else {
    //       target.verticalCenter = "bottom";
    //       target.horizontalCenter = "middle";
    //       return 0;
    //     }
    //   });
    //
    //   this.chart = null;
    //   this.chart = iotChart;
    // });


  }

}
