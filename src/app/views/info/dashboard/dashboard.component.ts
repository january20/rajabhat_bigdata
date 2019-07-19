import { Component, OnInit, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt'
import { Subscription } from 'rxjs';
import { InfoService } from '../shared/info.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

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
  type: any;
  currentTypeData: any;
  mqttClient: any;
  charts: any = {};
  latest: any = {};

  constructor(
    private infoService: InfoService,
    private mqttService: MqttService,
    private zone: NgZone
  ) { }

  async ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // console.log(this.info_types);
      // this.createCharts(this.currentTypeData);
    });
  }

  changeType(id) {
    const model = this.info_types.find(x => x.id === id);
    // console.log(model);
    this.type = model;
    this.active_id = id;

    setTimeout(() => {
      if(this.subscription) this.subscription.unsubscribe();
      model.mqtt_name.forEach(name => {
        console.log(name.data);
        this.charts[`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`] = am4core.create(`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`, am4charts.XYChart);
        this.latest[`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`] = name.data && name.data.length ? name.data[name.data.length - 1][model.field] : 0;
        // console.log(this.charts[`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`]);
        this.createCharts(this.charts[`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`], model, name);
      });

      
      
    });

    
   
    // this.currentTypeData = model;
    

    // this.getData(model.mqtt_name);
  }

  loadData() {
    this.infoService.dashboard().subscribe((data: any) => {
      
      this.info_types = data;
      this.changeType(data[0].id);
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
        let bullet = series.bullets.push(new am4charts.CircleBullet());
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
        // series.strokeWidth = 2;
        // series.minBulletDistance = 0.5;
        // series.interpolationDuration = 500;
        // series.defaultState.transitionDuration = 0;
        // series.tensionX = 0.8;
        series.fillOpacity = 0.5;
        series.strokeWidth = 3;

        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        let bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        // gradient.addColor(chart.colors.getIndex(0), 0.2);
        // gradient.addColor(chart.colors.getIndex(0), 0);
        // series.fill = gradient;

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

        this.subscription = this.mqttService.observe(name.mqtt_name).subscribe((message: IMqttMessage) => {
          // let lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
          // console.log(message.payload.toString())
          this.latest[`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`] = message.payload.toString();
          this.charts[`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`].addData({ date: new Date(), [model.field]: message.payload.toString() }, 1);
        });

      // });
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
