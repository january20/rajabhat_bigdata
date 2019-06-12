import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    private http: HttpClient
  ) { }

  populationAll(query?) {
    return this.http.get(`${environment.api_url}/info/population${query ? query : ''}`);
  }

  populationAge(query?) {
    return this.http.get(`${environment.api_url}/info/population/age${query ? query : ''}`);
  }

  populationEducation(query?) {
    return this.http.get(`${environment.api_url}/info/population/education${query ? query : ''}`);
  }

  populationOccupation(query?) {
    return this.http.get(`${environment.api_url}/info/population/occupation${query ? query : ''}`);
  }
  weatherDuration(duration_id?){
    return this.http.get(`${environment.api_url}/ref/weather/${duration_id} ? duration_id : 'duration'`);
  }
  weatherStations(){
    return this.http.get(`${environment.api_url}/ref/weather/stations`);
  }

}
