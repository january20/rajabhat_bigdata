import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  getProject(id) {
    return this.http.get(`${environment.api_url}/projects/${id}`);
  }

  getResult() {
    return this.http.get(`${environment.api_url}/projects?t=result`);
  }

  getProjectList(page) {
    return this.http.get(`${environment.api_url}/projects?t=project_list_index&page=${page}`);
  }

  getDistricts() {
    return this.http.get(`${environment.api_url}/ref/districts?t=province&province_id=32`);
  }

  getSubDistricts(district_id: number) {
    return this.http.get(`${environment.api_url}/ref/sub_districts?t=with_district_id&district_id=${district_id}`);
  }

  getVillages(sub_district_id: number) {
    return this.http.get(`${environment.api_url}/ref/villages?t=with_sub_district_id&sub_district_id=${sub_district_id}`)
  }
}
