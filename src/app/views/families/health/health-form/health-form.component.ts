import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FamiliesService } from '../../shared/families.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-health-form',
  templateUrl: './health-form.component.html',
  styleUrls: ['./health-form.component.scss']
})
export class HealthFormComponent implements OnInit {

  title = this.route.snapshot.data['title'];
  formType: 'CREATE' | 'EDIT' = this.route.snapshot.data['formType'];
  form: FormGroup;
  icd_group: any;
  icd: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private familiesService: FamiliesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
    this.buildForm();
  }

  loadData() {
    this.familiesService.healthCreate().subscribe(data => this.icd_group = data);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      member_id: this.route.snapshot.params.id,
      member_role: this.route.snapshot.params.role,
      ref_icd_code: [''],
      height: [''],
      weigth: [''],
      symtom: [''],
      blood_pressure: [''],
      body_temp: [''],
      blood_sugar: [''],
      date: ['']
    });
  }

}
