import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SurinService {

  constructor(private http: HttpClient) { }

  income(district_id=3202){
    console.log("Request=>"+`${environment.api_url}/info/population/income/${district_id}`);
    return this.http.get<any>(`${environment.api_url}/info/population/income/${district_id}`);
  }

  population(district_id=320403){
    //environment.api_url => https://surin.srru.ac.th/api
    console.log(`${environment.api_url}/info/population?sub_district_id=${district_id}`);
    return this.http.get<any>(`${environment.api_url}/info/population?sub_district_id=${district_id}`)
  }

  sub_districts(district_id=3204){
    console.log(`${environment.api_url}/ref/sub_districts?t=with_district_id&district_id=${district_id}`);
    return this.http.get<any>(`${environment.api_url}/ref/sub_districts?t=with_district_id&district_id=${district_id}`);
  }


}
