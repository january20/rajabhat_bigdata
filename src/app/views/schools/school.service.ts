import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private _http: HttpClient) { }

  schoolmis(school_code, year) {
    return this._http.get(`${environment.api_url}/schools/schoolmis?school_code=${school_code}&year=${year}`);
  }

  schoolList(area_code) {
    return this._http.get(`${environment.api_url}/schools/school_list?area_code=${area_code}`);
  }
}
