import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WelfareService {

  constructor(    
      private http: HttpClient
    ) { }

  welfareInfo(){
    return this.http.get(`${environment.api_url}/welfare`);  
  }
  welfareDistrict(district_id = 0){
    return this.http.get(`${environment.api_url}/welfare?district_id=${district_id}`);  

  }
  welfareSubDistrict(sub_district_id = 0){

  }

}
