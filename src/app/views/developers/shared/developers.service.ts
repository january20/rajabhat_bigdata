import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(
    private http: HttpClient
  ) { }

  getApi() {
    return this.http.get(`${environment.api_url}/dev`);
  }

  testApi(method, url, data?) {
    if(method === 'get') return this.http.get(url);
    else if(method === 'post') return this.http.post(url, data);
  }
}
