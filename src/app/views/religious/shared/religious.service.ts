import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ReligiousService {

  constructor(
    private http:HttpClient
  ) { }
  siteInfos(){
    return this.http.get(`${environment.api_url}/religious/sites`);
  }
}
