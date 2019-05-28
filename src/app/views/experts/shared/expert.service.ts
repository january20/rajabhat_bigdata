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

  createExpert() {
    return this.http.get(`${environment.api_url}/experts/create`)
  }
}
