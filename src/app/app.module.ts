import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'mqtt.srru.ac.th',
  clientId: 'ng-srru-bigdata',
  port: 443,
  path: '',
  protocol: 'wss',
  username: 'miot',
  password: 'SrruMIoT@2019'
};

import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { JWTInterceptor } from './shared/helpers/jwt.interceptor';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {
  HeaderComponent,
  FooterComponent
} from './shared/layout';
import { Error401Component } from './views/errors/error401/error401.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Error401Component
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
