import { Component, OnInit } from '@angular/core';
import { ExpertService } from '../shared/expert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  experts: Array<Object>;

  expert_type_color = {
    1: 'success',
    2: 'royal',
    3: 'warning'
  }

  constructor(
    private expertService: ExpertService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.expertService.getAll().subscribe((data: any) => this.experts = data);
  }

}
