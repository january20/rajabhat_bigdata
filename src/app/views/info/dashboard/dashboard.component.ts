import { Component, OnInit, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt'
import { Subscription } from 'rxjs';
import { InfoService } from '../shared/info.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscription: Subscription;
  data = {};
  info_types: any;
  active_id: number;
  type: any[] = [];
  currentTypeData: any;
  mqttClient: any;
  charts: any[] = [];
  latest: any = {};

  constructor(
    private infoService: InfoService,
    private mqttService: MqttService,
    private zone: NgZone
  ) { }

  async ngOnInit() {
    this.loadLabels();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // console.log(this.info_types);
      // this.createCharts(this.currentTypeData);
    });
  }

  changeType(id) {
    const model = this.info_types.find(x => x.id === id);
    console.log(model);
    //this.type = model;
    this.charts = [];
    this.active_id = id;

    // setTimeout(() => {
    //   if(this.subscription) this.subscription.unsubscribe();
      model.mqtt_name.forEach(name => {
        const chartId = uuidv4();
        this.charts.push({
          mas_iot_device_id: name.mas_iot_device_id,
          field: model.field,
          dom_id: chartId,
          unit: model.unit,
          location_name: name.device.location_name
        });
        this.loadData(chartId, name.mas_iot_device_id, model.field, model.iot_type_name_th, name.device);
      });
    //
    //
    //
    // });
    // this.currentTypeData = model;
    // this.getData(model.mqtt_name);
  }

  loadLabels() {

    this.infoService.dashboard().subscribe((data: any) => {
      this.info_types = data;
      this.changeType(data[0].id);
    });
  }
  loadData(chartId, mas_iot_device_id, yField, iot_type_name_th, device){
    this.infoService.loadIotData(mas_iot_device_id, yField, 12).subscribe((data:any)=>{

      let index = this.charts.findIndex(d => d.dom_id === chartId);
      if(data.length>0){
      //  this.charts[index].latest = `${data[data.length-1]}.${yField}`;
        this.createChartV2(data, chartId , 'xField', yField, iot_type_name_th);
      }else{
        this.charts.splice(index,1);
      }
    });
  }
  createChartV2(data,chartId, xField,yField,legendField) {



      this.zone.runOutsideAngular(() => {

        let chart = am4core.create( chartId , am4charts.XYChart);
        let categoryAxis = chart.xAxes.push(  new am4charts.CategoryAxis() );
        let valueAxis = chart.yAxes.push( new am4charts.ValueAxis() );
        let series = chart.series.push( new am4charts.LineSeries() );
        let gradient = new am4core.LinearGradient();

        chart.data = data;

        console.log(yField, xField);

        series.dataFields.valueY = yField;
        series.dataFields.categoryX  = xField;
        series.tooltipText = "{value}"
        series.fillOpacity = 0.5;
        series.strokeWidth = 1;

        categoryAxis.dataFields.category = xField;
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
  }



  createCharts(chart, model, name) {
    // field.mqtt_name.forEach((name: any) => {
      setTimeout(() => {
        // let chart = am4core.create(`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`, am4charts.XYChart);
        // let chart = this.charts[`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`];
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        let series = chart.series.push(new am4charts.LineSeries());
        // let bullet = series.bullets.push(new am4charts.CircleBullet());
        let gradient = new am4core.LinearGradient();

        chart.data = name.data.map((d: any) => {
          d.date = new Date(d.created_at)
          return d;
        });
        dateAxis.baseInterval = {
          "timeUnit": "minute",
          "count": 1
        }
        dateAxis.renderer.inside = true;
        dateAxis.renderer.minGridDistance = 50;
        series.dataFields.valueY = model.field;
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"
        series.fillOpacity = 0.5;
        series.strokeWidth = 1;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        // gradient.addColor(chart.colors.getIndex(0), 0.2);
        // gradient.addColor(chart.colors.getIndex(0), 0);
        // series.fill = gradient;



        // this.subscription = this.mqttService.observe(name.mqtt_name).subscribe((message: IMqttMessage) => {
        //   // let lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
        //   // console.log(message.payload.toString())
        //   this.latest[`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`]['value'] = message.payload.toString();
        //   this.latest[`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`]['time'] = new Date();
        //   this.charts[`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`].addData({ date: new Date(), [model.field]: message.payload.toString() }, 1);
        // });

      // });
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  ngOnDestroy() {
  //  this.subscription.unsubscribe();
  }

}
