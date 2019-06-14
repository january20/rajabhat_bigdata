import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Otop } from './otop';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  all() {
    return this.http.get<Array<Otop>>(`${environment.api_url}/otop/all`);
  }

  getMyList(page) {
    return this.http.get<Array<Otop>>(`${environment.api_url}/otop/mylist?page=${page}`);
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

  destroy(id) {
    return this.http.delete(`${environment.api_url}/otop/${id}`);
  }

  categories() {
    return this.http.get(`${environment.api_url}/otop/categories`);
  }

  searchSubDistricts(query: string): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/ref/sub_districts?t=q&name=${query}`);
  }

  count() {
    return this.http.get(`${environment.api_url}/otop/count`);
  }
}
