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
    //console.log(`service_strategies = ${year}`)
    return this.http.get(`${environment.api_url}/ref/srru_strategies?strategy_year=${year}`);
  }
  srru_strategies_chart(year=2018){
    //console.log(`service_strategies = ${year}`)
    return this.http.get(`${environment.api_url}/kpi/srru?strategy_year=${year}`);
  }
  rajabhat_strategies_chart(year=2018){
    //console.log(`service_strategies = ${year}`)
    return this.http.get(`${environment.api_url}/kpi/rajabhat?strategy_year=${year}`);
  }
  national_strategies_chart(year=2018){
    return this.http.get(`${environment.api_url}/kpi/national?strategy_year=${year}`);
  }
  project_schemes_chart(){
    return this.http.get(`${environment.api_url}/kpi/schemes`);
  }
  project_benefits_chart(){
    return this.http.get(`${environment.api_url}/kpi/benefits`);
  }




}
