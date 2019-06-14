import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get(`${environment.api_url}/experts`); 
  }

  get(id) {
    return this.http.get(`${environment.api_url}/experts/${id}`);
  }

  getMyList() {
    return this.http.get(`${environment.api_url}/experts/mylist`);
  }

  create() {
    return this.http.get(`${environment.api_url}/experts/create`);
  }

  store(formData) {
    return this.http.post(`${environment.api_url}/experts`, formData);
  }

  edit(id) {
    return this.http.get(`${environment.api_url}/experts/${id}/edit`);
  }

  update(formData, id) {
    return this.http.put(`${environment.api_url}/experts/${id}`, formData);
  }

  delete(id) {
    return this.http.delete(`${environment.api_url}/experts/${id}`);
  }

  count() {
    return this.http.get(`${environment.api_url}/experts/count`);
  }
}
