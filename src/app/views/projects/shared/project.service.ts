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

  storeProject(formData) {
    return this.http.post(`${environment.api_url}/projects`, formData);
  }

  getProject(id: number) {
    return this.http.get(`${environment.api_url}/projects/${id}`);
  }

  getEditProject(id: number) {
    return this.http.get(`${environment.api_url}/projects/${id}/edit`);
  }

  getResult() {
    return this.http.get(`${environment.api_url}/projects/result`);
  }

  getProjectList(page: number) {
    return this.http.get(`${environment.api_url}/projects?page=${page}`);
  }

  getMyProjectList() {
    return this.http.get(`${environment.api_url}/projects/my_projects`);
  }

  getSubDistricts(district_id: number) {
    return this.http.get(`${environment.api_url}/ref/sub_districts?t=with_district_id&district_id=${district_id}`);
  }

  getVillages(sub_district_id: number) {
    return this.http.get(`${environment.api_url}/ref/villages?t=with_sub_district_id&sub_district_id=${sub_district_id}`);
  }

  getSubFaculty(fac_id: number) {
    return this.http.get(`${environment.api_url}/mis?t=sub_fac&fac_id=${fac_id}`);
  }

  getBranches(sub_fac_id: number) {
    return this.http.get(`${environment.api_url}/mis?t=branch&sub_fac_id=${sub_fac_id}`);
  }

  getStaffs(program_id: number) {
    return this.http.get(`${environment.api_url}/mis?t=staff&program_id=${program_id}`);
  }

  getMiscData() {
    return this.http.get(`${environment.api_url}/ref/misc?t=project_create_data`);
  }

}
