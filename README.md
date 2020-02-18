# Rajabhat Bigdata

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Requirements  

Download & install nodejs => https://nodejs.org/en/ 
 - node 
 - npm 

## Configure 
 - clone project & prepare libs <br>
 git clone https://github.com/january20/rajabhat_bigdata.git <br>
 cd /_path-to_/rajabhat_bigdata <br>
 npm install 

- edit mqtt client id  in [src/app/app.module.ts] 
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {<br>
&nbsp;&nbsp;&nbsp;hostname: 'mqtt.srru.ac.th',<br>
&nbsp;&nbsp;&nbsp;clientId: 'ng-srru-bigdata',  <= Change the clinetId (maybe a random string) <br>
&nbsp;&nbsp;&nbsp;port: 443,<br>
&nbsp;&nbsp;&nbsp;path: '',<br>
&nbsp;&nbsp;&nbsp;protocol: 'wss',<br>
&nbsp;&nbsp;&nbsp;username: 'miot',<br>
&nbsp;&nbsp;&nbsp;password: '<passowrd>'<br>
};



## Run  

ng serve 

open http://localhost:4200 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
