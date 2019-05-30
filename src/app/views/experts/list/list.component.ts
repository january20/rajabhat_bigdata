import { Component, OnInit } from '@angular/core';
import { ExpertService } from '../shared/expert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  experts: Array<Object>;

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
