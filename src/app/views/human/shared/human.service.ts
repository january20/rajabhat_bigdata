import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HumanService {

  constructor(
    private http: HttpClient
  ) { }
  humanSecured(){
    return this.http.get(`${environment.api_url}/human/all`);
  }
  districtTable(district_id){
    return this.http.get(`${environment.api_url}/human/districts?id=${district_id}`);

  }
  subDistrictTable(sub_district_id){
    return this.http.get(`${environment.api_url}/human/sub_districts?id=${sub_district_id}`);
  }

  districts(province_id=32){
    return this.http.get(`${environment.api_url}/areas/districts?province_id=${province_id}`);
  }
  subDistricts(district_id){
    return this.http.get(`${environment.api_url}/areas/sub_districts?district_id=${district_id}`);

  }
}
