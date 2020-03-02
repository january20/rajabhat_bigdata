import { Component, OnInit } from '@angular/core';
import { ReferenceService } from 'src/app/shared/services/reference.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SchoolService } from '../school.service';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError, delay } from 'rxjs/operators';

@Component({
  selector: 'app-schoolmis',
  templateUrl: './schoolmis.component.html',
  styleUrls: ['./schoolmis.component.scss']
})
export class SchoolmisComponent implements OnInit {

  filterForm: FormGroup;
  schools = [];
  data = null;
  results = [];
  isLoadingResults = false;
  isRateLimitReached = false;

  constructor(
    private _schoolService: SchoolService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadSchools();

    this.area.valueChanges.subscribe(area_code => {
      this.loadSchools(area_code);
    });

    this.class.valueChanges.subscribe(val => {
      this.setClass(val);
    });

    merge(this.school.valueChanges, this.year.valueChanges).pipe(
      startWith({}),      
      switchMap(() => {
        this.isLoadingResults = true;

        return this._schoolService!.schoolmis(this.school.value, this.year.value);
      }),
      map((res: any) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;

        return res;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;

        return of([]);
      })
    ).subscribe(data => {
      this.data = data;
      this.class.patchValue(1);
    });
  }

  setClass(val?) {    
    if(Object.keys(this.data).length > 0) {
      switch(val) {
        case 1: {
          this.results = [
            { name: 'อ.1 ชาย', value: this.data.a_1_m },
            { name: 'อ.1 หญิง', value: this.data.a_1_f },
            { name: 'อ.2 ชาย', value: this.data.a_2_m },
            { name: 'อ.2 หญิง', value: this.data.a_2_f },
            { name: 'อ.3 ชาย', value: this.data.a_3_m },
            { name: 'อ.3 หญิง', value: this.data.a_3_f },
          ]
          break;
        }
        case 2: {
          this.results = [
            { name: 'ป.1 ชาย', value: this.data.p_1_m },
            { name: 'ป.1 หญิง', value: this.data.p_1_f },
            { name: 'ป.2 ชาย', value: this.data.p_2_m },
            { name: 'ป.2 หญิง', value: this.data.p_2_f },
            { name: 'ป.3 ชาย', value: this.data.p_3_m },
            { name: 'ป.3 หญิง', value: this.data.p_3_f },
            { name: 'ป.4 ชาย', value: this.data.p_4_m },
            { name: 'ป.4 หญิง', value: this.data.p_4_f },
            { name: 'ป.5 ชาย', value: this.data.p_5_m },
            { name: 'ป.5 หญิง', value: this.data.p_5_f },
            { name: 'ป.6 ชาย', value: this.data.p_6_m },
            { name: 'ป.6 หญิง', value: this.data.p_6_f },
          ]
          break;
        }
        case 3: {
          this.results = [
            { name: 'ม.1 ชาย', value: this.data.m_1_m },
            { name: 'ม.1 หญิง', value: this.data.m_1_f },
            { name: 'ม.2 ชาย', value: this.data.m_2_m },
            { name: 'ม.2 หญิง', value: this.data.m_2_f },
            { name: 'ม.3 ชาย', value: this.data.m_3_m },
            { name: 'ม.3 หญิง', value: this.data.m_3_f },
          ]
          break;
        }
        case 4: {
          this.results = [
            { name: 'ม.4 ชาย', value: this.data.m_4_m },
            { name: 'ม.4 หญิง', value: this.data.m_4_f },
            { name: 'ม.5 ชาย', value: this.data.m_5_m },
            { name: 'ม.5 หญิง', value: this.data.m_5_f },
            { name: 'ม.6 ชาย', value: this.data.m_6_m },
            { name: 'ม.6 หญิง', value: this.data.m_6_f },
          ]
          break;
        }
        case 5: {
          this.results = [
            { name: 'ปวช.1 ชาย', value: this.data.c_1_m },
            { name: 'ปวช.1 หญิง', value: this.data.c_1_f },
            { name: 'ปวช.2 ชาย', value: this.data.c_2_m },
            { name: 'ปวช.2 หญิง', value: this.data.c_2_f },
            { name: 'ปวช.3 ชาย', value: this.data.c_3_m },
            { name: 'ปวช.3 หญิง', value: this.data.c_3_f },
          ]
          break;
        }
      }
    }
  }

  loadSchools(area_code?) {
    this._schoolService.schoolList(area_code || this.area.value).subscribe((schools: Array<any>) => {
      this.schools = schools;
      this.filterForm.get('school').setValue(schools[0].school_code);
    });
  }

  buildForm() {
    this.filterForm = this._formBuilder.group({
      class: [''],
      area: [3201],
      year: [2562],
      school: ['']
    });
  }

  get area() { return this.filterForm.get('area') as FormControl }
  get class() { return this.filterForm.get('class') as FormControl }
  get school() { return this.filterForm.get('school') as FormControl }
  get year() { return this.filterForm.get('year') as FormControl }
}
