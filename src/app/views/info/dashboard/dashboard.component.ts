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

  constructor(
    private infoService: InfoService,
    private mqttService: MqttService,
    private zone: NgZone
  ) { }

  async ngOnInit() {
    this.loadData();
    this.subscription = this.mqttService.observe('/srru/humid/9').subscribe((message: IMqttMessage) => {
      // this.data[name.field].push({ val: message.payload.toString() });
      console.log(message.payload.toString());
    });
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
    this.type = model;
    this.active_id = id;

    // this.currentTypeData = model;
    this.createCharts(model);
   
    // this.getData(model.mqtt_name);
  }

  loadData() {
    this.infoService.dashboard().subscribe((data: any) => {
      this.info_types = data;
      this.changeType(data[0].id);
    });
  }

  getData(mqtt_name) {
    // mqtt_name.forEach(name => {
      // this.subscription = this.mqttService.observe('/srru/humid/9').subscribe((message: IMqttMessage) => {
      //   // this.data[name.field].push({ val: message.payload.toString() });
      //   console.log(message.payload.toString());
      // });
    // });
  }

  createCharts(type) {
    type.mqtt_name.forEach((name: any) => {
      setTimeout(() => {
        let chart = am4core.create(`iot${name.mas_iot_device_id}${name.ref_iot_type_id}`, am4charts.XYChart);
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        let series = chart.series.push(new am4charts.LineSeries());
        let bullet = series.bullets.push(new am4charts.CircleBullet());
        let gradient = new am4core.LinearGradient();

        chart.data = name.data.map((d: any) => {
          d.date = new Date(d.created_at)
          return d;
        });
        chart.hiddenState.properties.opacity = 0;
        chart.padding(0, 0, 0, 0);
        chart.zoomOutButton.disabled = true;
        dateAxis.baseInterval = {
          "timeUnit": "minute",
          "count": 5
        }
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 30;
        dateAxis.dateFormats.setKey("second", "ss");
        dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
        dateAxis.renderer.inside = true;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;

        valueAxis.tooltip.disabled = true;
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;
        valueAxis.renderer.inside = true;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        series.dataFields.dateX = "date";
        series.dataFields.valueY = type.field;
        series.interpolationDuration = 500;
        series.defaultState.transitionDuration = 0;
        series.tensionX = 0.8;

        chart.events.on("datavalidated", function () {
          dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
        });

        dateAxis.interpolationDuration = 500;
        dateAxis.rangeChangeDuration = 500;

        // this.subscription = this.mqttService.observe(name.mqtt_name).subscribe((message: IMqttMessage) => {
        //   console.log(this.data);
        //   let lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
        //   chart.addData({ date: new Date(), value: message.payload.toString() }, 1);
        // });

        series.fillOpacity = 1;
        gradient.addColor(chart.colors.getIndex(0), 0.2);
        gradient.addColor(chart.colors.getIndex(0), 0);
        series.fill = gradient;

        dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
          let dataItem = target.dataItem;
          return dataItem.position;
        })

        dateAxis.events.on("validated", function () {
          am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
            label.fillOpacity = label.fillOpacity;
          })
        })

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

        bullet.circle.radius = 5;
        bullet.fillOpacity = 1;
        bullet.fill = chart.colors.getIndex(0);
        bullet.isMeasured = false;

        series.events.on("validated", function() {
            // bullet.moveTo(series.dataItems.last.point);
            bullet.validatePosition();
        });

      });
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  } 

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
