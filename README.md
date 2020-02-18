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
 npm cache clean<br>
 npm install 

- edit mqtt client id  in [src/app/app.module.ts] <br>
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {<br>
&nbsp;&nbsp;&nbsp;hostname: 'mqtt.srru.ac.th',<br>
&nbsp;&nbsp;&nbsp;clientId: 'ng-srru-bigdata',  <= Change the clientId (maybe a random string) <br>
&nbsp;&nbsp;&nbsp;port: 443,<br>
&nbsp;&nbsp;&nbsp;path: '',<br>
&nbsp;&nbsp;&nbsp;protocol: 'wss',<br>
&nbsp;&nbsp;&nbsp;username: 'miot',<br>
&nbsp;&nbsp;&nbsp;password: '<passowrd>'<br>
};



## Run  

ng serve 

open http://localhost:4200 

## Build & Deploy 

## Merge code

cd /_path-to_/rajabhat_bigdata <br>
git add . <br>
git commit -m "branch comments" <br>
git push

## API 
please contact srru dev team 
