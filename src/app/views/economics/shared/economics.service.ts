import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EconomicsService {

  constructor(
    private http:HttpClient
  ){
    
  }
  loadVolume(){
    return this.http.get(`https://qrdee.co/api/v2/volume`);
  }
  loadBestSeller(){
    return this.http.get(`https://qrdee.co/api/v2/bestseller`);
  }



}
