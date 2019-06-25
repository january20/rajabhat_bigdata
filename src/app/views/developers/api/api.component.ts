import { Component, OnInit } from '@angular/core';
import { DevelopersService } from '../shared/developers.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  refApi;
  exampleForm: FormGroup;
  active_id: number;
  api: any;
  base_path = environment.api_url;
  response: string;

  constructor(
    private devService: DevelopersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {    
    this.buildForm();
    this.loadData();
  }

  changeApi(id) {
    const model = this.refApi.find(x => x.id === id);

    this.api = model;
    this.active_id = id;
    this.response = null;
    
    this.exampleForm.patchValue({
      method: model.method.toUpperCase(),
      url: this.base_path + model.example_path
    });
  }

  testApi() {
    const formVal = this.exampleForm.value;

    this.devService.testApi(formVal.method.toLowerCase(), formVal.url).subscribe((data: any) => this.response = data);
  }

  loadData() {
    this.devService.getApi().subscribe((data: any) => this.refApi = data);
  }

  buildForm() {
    this.exampleForm = this.formBuilder.group({
      method: [''],
      url: ['']
    });
  }

}
