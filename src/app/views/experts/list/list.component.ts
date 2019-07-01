import { Component, OnInit } from '@angular/core';
import { ExpertService } from '../shared/expert.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  models: Array<Object>;
  experts: any;
  expertises: any;
  expert_type_color = {
    1: 'success',
    2: 'royal',
    3: 'warning'
  }
  search = new FormControl();
  expertSelect = new FormControl();

  constructor(
    private expertService: ExpertService
  ) { }

  ngOnInit() {
    this.loadData();
    this.loadExpertises();

    this.search.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      // this.expertSelect.patchValue(0);
      this.experts = this.models.filter((i: any) => {
        const name = i.sys_user.firstname + ' ' + i.sys_user.lastname;
        return name.includes(term);
      }); 
    });
  }

  loadData() {
    this.expertService.getAll().subscribe((data: any) => {
      this.models = data;
      this.experts = data;
    });
  }

  loadExpertises() {
    this.expertService.getExpertises().subscribe(data => this.expertises = data);
  }

  filter(type) {
    return this.models.filter((i: any) => i.expert_type.id === type);
  }

  selectExpertise(val) {
    this.experts = this.models.filter((i: any) => val === 0 ? true : i.expertise.id === val);
  }

}
