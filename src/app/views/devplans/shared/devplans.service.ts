import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevplansService {

  constructor(
    private http:HttpClient
  ) { }

  loadDevPlans(default_topic,district_id,sub_district_id,village_id){
    let params = '?topic_id='+default_topic;
    if(district_id){
      params+=`&district_id=${district_id}`;
    }
    if(sub_district_id){
      params+=`&sub_district_id=${sub_district_id}`;
    }
    if(village_id){
      params+=`&village_id=${village_id}`;
    }
    console.log(`${environment.api_url}/devplans${params}`);

    return this.http.get(`${environment.api_url}/devplans${params}`)
  }
  getTopics(){
    return this.http.get(`${environment.api_url}/devplans/topics`);
  }
  getLocation(district_id,sub_district_id,village_id){
    let params = '';
    if(district_id){
      params+=`&district_id=${district_id}`;
    }
    if(sub_district_id){
      params+=`&sub_district_id=${sub_district_id}`;
    }
    if(village_id){
      params+=`&village_id=${village_id}`;
    }
    console.log(`${environment.api_url}/devplans/locate?${params}`);
    return this.http.get(`${environment.api_url}/devplans/locate?${params}`);
  }
}
