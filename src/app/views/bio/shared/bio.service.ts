import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BioService {

  constructor(
    private http: HttpClient
  ) { }

  getBio() {
    return this.http.get(`${environment.api_url}/bio`);
  }

  getAnimalGroups() {
    return this.http.get(`${environment.api_url}/ref/animal_organs`);
  }

  getPlantOrgans() {
    return this.http.get(`${environment.api_url}/ref/plant_organs`);
  }

  storeBio(formData, group_id) {
    return this.http.post(`${environment.api_url}/bio?method=browser&diversity_group=${group_id}`, formData);
  }
}
