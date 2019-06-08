import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(
    private http: HttpClient
  ) { }

  districts() {
    return this.http.get(`${environment.api_url}/ref/districts?t=province&province_id=32`);
  }

  sub_districts(district_id) {
    return this.http.get(`${environment.api_url}/ref/sub_districts?t=with_district_id&district_id=${district_id}`);
  }

  villages(sub_district_id) {
    return this.http.get(`${environment.api_url}/ref/villages?t=with_sub_district_id&sub_district_id=${sub_district_id}`);
  }
}
