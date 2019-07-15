import { Component, OnInit, OnDestroy } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt'
import { Subscription } from 'rxjs';
import { InfoService } from '../shared/info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  data = {};
  info_types: any;
  active_id: number;
  type: any;

  constructor(
    private infoService: InfoService,
    private mqttService: MqttService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  changeType(id) {
    const model = this.info_types.find(x => x.id === id);

    this.type = model;
    this.active_id = id;

    this.getData(model.mqtt_name);
  }

  loadData() {
    this.infoService.dashboard().subscribe((data: any) => {
      this.info_types = data.info;
      this.data = data.data;
      this.changeType(data.info[0].id);
    });
  }

  getData(mqtt_name) {
    mqtt_name.forEach(name => {
      this.subscription = this.mqttService.observe(name.mqtt_name).subscribe((message: IMqttMessage) => {
        this.data[name.field].push({ val: message.payload.toString() });
        console.log(this.data);
      });
    });
    // this.subscription = this.mqttService.observe('/srru/temp/9').subscribe((message: IMqttMessage) => {
    //   this.data.push(message.payload.toString());
    // });
  }

  public unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
