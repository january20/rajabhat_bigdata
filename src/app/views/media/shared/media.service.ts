import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor( private http: HttpClient ) { }

  testAPI(){
      return this.http.get(`${environment.api_url}/otop`);
  }



}
