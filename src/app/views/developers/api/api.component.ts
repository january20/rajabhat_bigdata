import { Component, OnInit } from '@angular/core';
import { DevelopersService } from '../shared/developers.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  refApi;
  active_id: number;
  api: any;

  constructor(
    private devService: DevelopersService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  changeApi(id) {
    this.active_id = id;
    this.api = this.refApi.find(x => x.id === id);
  }

  loadData() {
    this.devService.getApi().subscribe((data: any) => this.refApi = data);
  }

}
