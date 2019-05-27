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

  getSurinCoorddinates() {
    return this.http.get('assets/json/surin-polygon.json');
  }

  getVillages() {
    return this.http.get(`${environment.api_url}/villages`);
  }

  getVillage(id) {
    return this.http.get(`${environment.api_url}/villages/${id}`);
  }
}
