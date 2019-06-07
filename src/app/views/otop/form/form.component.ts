import { Component, OnInit } from '@angular/core';
import { OtopService } from '../shared/otop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { map, startWith, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  title = this.route.snapshot.data['title'];
  formType: 'CREATE' | 'EDIT' = this.route.snapshot.data['formType'];
  form: FormGroup;
  categories: any;
  subDistricts: Observable<any> = null;
  isSubmit = false;

  constructor(
    private otopService: OtopService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.buildForm();
    this.loadData();

    this.subDistricts = this.form.get('sub_district').valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          return this.lookup(value);
        } else {
          // if no value is present, return null
          return of(null);
        }
      })
    );
  }

  submit() {
    this.isSubmit = true;

    console.log(this.form.value);

    this.isSubmit = false;
  }

  lookup(value: string): Observable<any> {
    return this.otopService.searchSubDistricts(value).pipe(
      // map the item property of the github results as our return object
      map(results => results),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );
  }

  displaySubDistrict(sub_district) {
    if(sub_district) return `ตำบล${sub_district.sub_district_name_th} อำเภอ${sub_district.district.district_name_th} จังหวัด${sub_district.province.province_name_th}`;    
  }

  loadData() {
    if(this.formType === 'CREATE') return;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      sub_district: ['', Validators.required],
      category: ['', Validators.required],
      // name: ['', Validators.required],
      // description: ['', Validators.required],
      // price: ['', Validators.required],
      // note: [''],
      // images: null
    });
  }

  loadCategories() {
    this.otopService.categories().subscribe(data => this.categories = data);
  }

}
