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
    return this.http.post(`${environment.api_url}/old_projects`, formData);
  }

  storeProjectActivity(formData) {
    return this.http.post(`${environment.api_url}/old_projects/activity`, formData);
  }

  storeProjectAssessment(formData) {
    return this.http.post(`${environment.api_url}/old_projects/assessment`, formData);
  }

  updateProject(formData, id) {
    return this.http.put(`${environment.api_url}/old_projects/${id}`, formData);
  }

  updateProjectActivity(formData, id) {
    return this.http.put(`${environment.api_url}/old_projects/activity/${id}`, formData);
  }

  deleteProject(id) {
    return this.http.delete(`${environment.api_url}/old_projects/${id}`);
  }

  deleteActivity(id) {
    return this.http.delete(`${environment.api_url}/old_projects/activity/${id}`);
  }

  getProject(id: number) {
    return this.http.get(`${environment.api_url}/old_projects/${id}`);
  }

  getEditProject(id: number) {
    return this.http.get(`${environment.api_url}/old_projects/${id}/edit`);
  }

  getProjectFormData() {
    return this.http.get(`${environment.api_url}/old_projects/create`);
  }

  getResult() {
    return this.http.get(`${environment.api_url}/old_projects/result`);
  }

  getProjectList() {
    return this.http.get(`${environment.api_url}/old_projects`);
  }

  getMyProjectList() {
    return this.http.get(`${environment.api_url}/old_projects/my_projects`);
  }

  getActivity(id) {
    return this.http.get(`${environment.api_url}/old_projects/activity/${id}`);
  }

  getProjectActivities(id) {
    return this.http.get(`${environment.api_url}/old_projects/activity?project_id=${id}`);
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

  getCreateActivity(id) {
    return this.http.get(`${environment.api_url}/old_projects/activity/create?project_id=${id}`);
  }

  getEditActivity(id) {
    return this.http.get(`${environment.api_url}/old_projects/activity/${id}/edit`);
  }

  getAssessmentProjects(id) {
    return this.http.get(`${environment.api_url}/old_projects/assessment/project_list?strategy_id=${id}`);
  }

  getCreateAssessment(id) {
    return this.http.get(`${environment.api_url}/old_projects/assessment/create?project_id=${id}`);
  }

  getAssessmentResult(project_id) {
    return this.http.get(`${environment.api_url}/old_projects/assessment/result?project_id=${project_id}`);
  }

  getMyProjects() {
    return this.http.get(`${environment.api_url}/dashboard/my_projects`);
  }

}
