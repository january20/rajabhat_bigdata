import { Component, OnInit, OnDestroy } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  data = [];

  constructor(
    private mqttService: MqttService
  ) {
    // this.subscription = this.mqttService.observe('srru/temp/9').subscribe((message: IMqttMessage) => {
    //   console.log(message);
    //   this.data.push(message.payload.toString());
    // });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.subscription = this.mqttService.observe('srru/temp/9').subscribe((message: IMqttMessage) => {
      console.log(message);
      this.data.push(message.payload.toString());
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
