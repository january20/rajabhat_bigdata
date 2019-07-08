import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamiliesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get(`${environment.api_url}/families`);
  }

  get(id, role) {
    return this.http.get(`${environment.api_url}/families/${id}?role=${role}`);
  }

  create() {
    return this.http.get(`${environment.api_url}/families/create`);
  }

  edit(id) {
    return this.http.get(`${environment.api_url}/families/${id}/edit`)
  }

  store(formData) {
    return this.http.post(`${environment.api_url}/families`, formData);
  }

  update(id, formData) {
    return this.http.put(`${environment.api_url}/families/${id}`, formData);
  }

  destroy(id) {
    return this.http.delete(`${environment.api_url}/families/${id}`);
  }

  getMembers(family_id) {
    return this.http.get(`${environment.api_url}/families/family_members?family_id=${family_id}`);
  }

  healthCreate() {
    return this.http.get(`${environment.api_url}/families/health/create`);
  }

  healthStore(formData) {
    return this.http.post(`${environment.api_url}/families/health`, formData);
  }
}
