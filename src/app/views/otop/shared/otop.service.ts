import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Otop } from './otop';

@Injectable({
  providedIn: 'root'
})
export class OtopService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(page, category?) {
    return this.http.get<Array<Otop>>(`${environment.api_url}/otop?${category ? 'category_id='+category+'&' : ''}page=${page}`);
  }

  getMyList() {
    return this.http.get<Array<Otop>>(`${environment.api_url}/otop/mylist`);
  }
  
  get(id) {
    return this.http.get<Otop>(`${environment.api_url}/otop/${id}`);
  }

  getRelatedProducts(cat_id) {
    return this.http.get(`${environment.api_url}/otop/related?category_id=${cat_id}`);
  }

  create() {
    return this.http.get(`${environment.api_url}/otop/create`);
  }

  edit(id) {
    return this.http.get(`${environment.api_url}/otop/${id}/edit`);
  }

  store(formData) {
    return this.http.post(`${environment.api_url}/otop`, formData);
  }

  update(id, formData) {
    return this.http.put(`${environment.api_url}/otop/${id}`, formData);
  }

  delete(id) {
    return this.http.delete(`${environment.api_url}/otop/${id}`);
  }

  categories() {
    return this.http.get(`${environment.api_url}/otop/categories`);
  }
}
