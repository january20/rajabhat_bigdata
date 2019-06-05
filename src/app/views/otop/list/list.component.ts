import { Component, OnInit } from '@angular/core';
import { OtopService } from '../shared/otop.service';
import { Otop } from '../shared/otop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  otop: Array<Otop>;
  categories: any;

  constructor(
    private otopService: OtopService
  ) { }

  ngOnInit() {
    this.loadData();
    this.loadCategories();
  }

  changePage(event) {
    this.loadData(event.pageIndex + 1);
  }

  loadData(page = 1) {
    this.otopService.getAll(page).subscribe(data => this.otop = data);    
  }

  loadCategories() {
    this.otopService.categories().subscribe(data => this.categories = data);
  }
}
