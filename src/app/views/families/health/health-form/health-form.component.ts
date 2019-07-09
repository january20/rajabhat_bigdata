import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamiliesService } from '../../shared/families.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  isSubmit = false;
  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();
  member_name: string;

  constructor(
    private formBuilder: FormBuilder,
    private familiesService: FamiliesService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadData();
    this.buildForm();
    this.subscribeToFormChanged();
  }

  submit() {
    this.isSubmit = true;

    // if(this.formType == 'CREATE') {
    this.familiesService.healthStore(this.form.value).subscribe(
      res => {
        this.snackBar.open('บันทึกข้อมูลสำเร็จ', '', {
          horizontalPosition: 'right',
          duration: 2000,
          panelClass: ['color-white', 'bg-success']
        });
        setTimeout(() => {
          this.isSubmit = false;
          this.router.navigateByUrl('/dashboard');
        }, 2000);          
      },
      err => {
        this.snackBar.open('เกิดขข้อผิดพลาด กรุณาตรวจสอบแบบฟอร์มอีกครั้ง', '', {
          horizontalPosition: 'right',
          duration: 2000,
          panelClass: ['color-white', 'bg-danger']
        });
        this.isSubmit = false;
      }
    );
    // } else {
    //   this.familiesService.update(this.route.snapshot.params.id, this.form.value).subscribe(
    //     res => {
    //       this.snackBar.open('แก้ไขข้อมูลสำเร็จ', '', {
    //         horizontalPosition: 'right',
    //         duration: 2000,
    //         panelClass: ['color-white', 'bg-success']
    //       });
    //       setTimeout(() => {
    //         this.isSubmit = false;
    //         this.router.navigateByUrl('/families');
    //       }, 2000);          
    //     },
    //     err => {
    //       this.snackBar.open('เกิดข้อผิดพลาด กรุณาตรวจสอบแบบฟอร์มอีกครั้ง', '', {
    //         horizontalPosition: 'right',
    //         duration: 2000,
    //         panelClass: ['color-white', 'bg-danger']
    //       });
    //       this.isSubmit = false;
    //     }
    //   );
    // }
  }

  loadData() {
    this.familiesService.healthCreate(this.route.snapshot.params.id, this.route.snapshot.params.role).subscribe((data: any) => {
      this.member_name = data.name;
      this.icd_group = data.icd;
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      member_id: [this.route.snapshot.params.id],
      member_role: [this.route.snapshot.params.role],
      ref_icd_code: ['', Validators.required],
      height: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
      ])],
      weight: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
      ])],
      symptom: ['', Validators.required],
      blood_pressure: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
      ])],
      body_temp: ['', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')],
      blood_sugar: ['', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')],
      date: ['', Validators.required]
    });
  }

  subscribeToFormChanged() {
    this.form.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => this.onValueChanged());
  }

  onValueChanged() {
    for(const field in this.formErrors) {
      this.formErrors[field] = '';

      const control = this.form.get(field);

      if((control && !control.valid) && control.dirty) {
        const messages = this.validationMessages[field];

        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  createFormErrors() {
    return {
      ref_icd_code: '',
      height: '',
      weight: '',
      symptom: '',
      blood_pressure: '',
      body_temp: '',
      blood_sugar: '',
      date: '',
    };
  }

  createValidationMessages() {
    return {
      ref_icd_code: {
        required: '*กรุณาระบุโรค'
      },
      height: {
        required: '*กรุณาระบุส่วนสูง',
        pattern: '*กรุณาระบุเป็นตัวเลขเท่านั้น'
      },
      weight: {
        required: '*กรุณาระบุน้ำหนัก',
        pattern: '*กรุณาระบุเป็นตัวเลขเท่านั้น'
      },
      symptom: {
        required: '*กรุณาระบุอาการ'
      },
      blood_pressure: {
        required: '*กรุณาระบุความดัน',
        pattern: '*กรุณาระบุเป็นตัวเลขเท่านั้น'
      },
      body_temp: {
        pattern: '*กรุณาระบุเป็นตัวเลขเท่านั้น'
      },
      blood_sugar: {
        pattern: '*กรุณาระบุเป็นตัวเลขเท่านั้น'
      },
      date: {
        required: '*กรุณาระบุวันที่ตรวจ'
      }
    };
  }

}
