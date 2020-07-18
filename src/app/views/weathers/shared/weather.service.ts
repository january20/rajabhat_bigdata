import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  loadRain(){
    return this.http.get(`${environment.api_url}/weather/rain`);
  }
  loadStations(){
    return this.http.get(`${environment.api_url}/weather/stations`);
  }
  loadStationId(id){
    return this.http.get(`${environment.api_url}/weather/rain?station_id=${id}`);
  }
}
