import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class KpiService {



  constructor(private http: HttpClient) {

      //ref/srru_strategies

  }
  srru_strategies(year=2018){
    console.log(`service_strategies = ${year}`)
      return this.http.get(`${environment.api_url}/ref/srru_strategies?strategy_year=${year}`);
  }




}
