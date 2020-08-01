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

  private subscription: Subscription[] = [];
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

  }

  changeType(id) {
    const model = this.info_types.find(x => x.id === id);
    console.log(model);
    //this.type = model;
    this.charts = [];
    this.active_id = id;

    // setTimeout(() => {
    //if(this.subscription) this.subscription.unsubscribe();
    this.unsubAll();

      model.mqtt_name.forEach(name => {

        console.log(name);
        const chartId = uuidv4();
        this.charts.push({
          mas_iot_device_id: name.mas_iot_device_id,
          field: model.field,
          dom_id: chartId,
          unit: model.unit,
          location_name: name.device.location_name,
          chart:null,
          latest:0,
          latest_at : null
        });
        this.loadData(chartId, name.mas_iot_device_id, name.mqtt_name, model.field, model.iot_type_name_th, name.device);
      });
  }

  loadLabels() {

    this.infoService.dashboard().subscribe((data: any) => {
      this.info_types = data;
      this.changeType(data[0].id);
    });

  }
  loadData(chartId, mas_iot_device_id, mqtt_name, yField, iot_type_name_th, device){
    this.infoService.loadIotData(mas_iot_device_id, yField, 12).subscribe((data:any)=>{      
      if(data.length>0){
        let index = this.charts.findIndex(d => d.dom_id === chartId);
        console.log(data[data.length-1]);
        let latest = data[data.length-1];
        this.charts[index].latest = latest[yField];
        this.charts[index].latest_at = latest['xField'];
        let chart = am4core.create( chartId , am4charts.XYChart);
        this.charts[index].chart = chart;
        this.createChartV2(data, chart , 'xField', yField, iot_type_name_th);
        console.log(mqtt_name);
        this.mqttSubscribe(chartId, mqtt_name, yField);
      }else{
        let index = this.charts.findIndex(d => d.dom_id === chartId);
        this.charts.splice(index,1);
      }
    });
  }

  mqttSubscribe(chartId, name, yField){
      const sub = this.mqttService.observe(name).subscribe((message: IMqttMessage) => {
        console.log(name, message.payload.toString(), this.charts.length);
        console.log(chartId, this.charts);
        try{
          let index = this.charts.findIndex(d => d.dom_id === chartId);
          let d = new Date(); // for now
          let dtext = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();;
          let data = {};
          data[yField]  = message.payload.toString();
          data['xField'] = dtext;
          console.log(index, "=>" ,data);
          this.charts[index].latest = message.payload.toString();
          this.charts[index].latest_at = dtext;
          this.charts[index].chart.addData(data, 1);// = message.payload.toString();
        }catch(e){}
      });
      this.subscription.push(sub);
  }
  createChartV2(data,chart, xField,yField,legendField) {

      this.zone.runOutsideAngular(() => {

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
        series.strokeWidth = 2;
        series.tensionX = 0.77;
        categoryAxis.dataFields.category = xField;
        categoryAxis.renderer.minGridDistance = 50;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.labels.template.rotation = 270;
        series.tooltipText = "{value}"
        //series.fillOpacity = 0.5;
        series.strokeWidth = 1;

        if(this.active_id==4){

          //valueAxis.min = 0;
          let ranges = [
            {color:16,start:50,end:0},//16
            {color:12,start:100,end:50},//12
            {color:11,start:150,end:100},//11
            {color:7,start:200,end:150},//7
            {color:5,start:300,end:200},//5
            {color:3,start:400,end:300},//3
            {color:1,start:1000000,end:400}//3
          ];
          ranges.forEach(el=>{
            let range = valueAxis.createSeriesRange(series);
            range.value = el.start;
            range.endValue = el.end;
            range.contents.stroke = chart.colors.getIndex(el.color);
            range.contents.fill = range.contents.stroke;
            range.contents.fillOpacity = 0.5;
    
          })

        }



        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.snapToSeries = series;

    });
  }

  unsubAll(){
    console.log("unsubscribe all ");

    this.subscription.forEach(e => {
      e.unsubscribe();
    });
  }
  public unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  ngOnDestroy() {
    this.unsubAll();
   //if(this.subscription) this.subscription.unsubscribe();
  }

}
