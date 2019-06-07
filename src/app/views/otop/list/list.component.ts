import { Component, OnInit, ViewChild } from '@angular/core';
import { OtopService } from '../shared/otop.service';
import { Otop } from '../shared/otop';
import { map } from 'rxjs/operators';
import { MatRadioButton } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  otop: any;
  categories: any;
  current_category = 0;

  constructor(
    private otopService: OtopService
  ) { }

  ngOnInit() {
    this.loadData();
    this.loadCategories();
  }

  changePage(event) {
    this.loadData(event.pageIndex + 1, this.current_category);
  }

  filterProducts(event) {
    if(event.value == 0) { this.loadData() }
    else {
      this.current_category = event.value;    
      this.loadData(1, event.value);
    }    
  }

  async loadData(page = 1, category?) {
    this.otopService.getAll(page, category).subscribe((data: any) => this.otop = data);    
  }

  loadCategories() {
    this.otopService.categories().subscribe((data: any) => this.categories = data);
  }
  
}
