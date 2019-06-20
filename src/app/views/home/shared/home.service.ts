import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getCountData() {
    return this.http.get(`${environment.api_url}/home`);
  }

  getSurinCoorddinates() {
    return this.http.get('assets/json/surin-polygon.json');
  }

  getVillages() {
    return this.http.get(`${environment.api_url}/villages`);
  }

  getVillage(id) {
    return this.http.get(`${environment.api_url}/villages/${id}`);
  }

  getWeathers() {
    return this.http.get(`${environment.api_url}/info/weather/stations`);
  }

  getAirQuality() {
    return this.http.get(`${environment.api_url}/info/air/stations`);
  }
}
