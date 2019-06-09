import { Component, OnInit } from '@angular/core';
import { FamiliesService } from '../shared/families.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formType: 'CREATE' | 'EDIT' = this.route.snapshot.data['formType'];
  title = this.route.snapshot.data['title'];
  form: FormGroup;
  prefixes: any;
  genders: any;
  occupations: any;
  educations: any;
  formReady = false;
  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();
  isSubmit = false;
  editMembers: any;

  constructor(
    private familiesService: FamiliesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadData();
    this.loadEditData();
    this.buildForm();    
    this.subscribeToFormChanged();
  }

  submit() {
    this.isSubmit = true;

    if(this.formType == 'CREATE') {
      this.familiesService.store(this.form.value).subscribe(
        res => {
          this.snackBar.open('บันทึกข้อมูลสำเร็จ', '', {
            horizontalPosition: 'right',
            duration: 2000,
            panelClass: ['color-white', 'bg-success']
          });
          console.log(res);
          setTimeout(() => {
            this.isSubmit = false;
            // this.router.navigateByUrl('/families');
          }, 2000);          
        },
        err => {
          console.log(err);
          this.snackBar.open('เกิดขข้อผิดพลาด กรุณาตรวจสอบแบบฟอร์มอีกครั้ง', '', {
            horizontalPosition: 'right',
            duration: 2000,
            panelClass: ['color-white', 'bg-danger']
          });
          this.isSubmit = false;
        }
      );
    } else {
      this.familiesService.update(this.route.snapshot.params.id, this.form.value).subscribe(
        res => {
          this.snackBar.open('แก้ไขข้อมูลสำเร็จ', '', {
            horizontalPosition: 'right',
            duration: 2000,
            panelClass: ['color-white', 'bg-success']
          });
          console.log(res);
          setTimeout(() => {
            this.isSubmit = false;
            // this.router.navigateByUrl('/families/'+res);
          }, 2000);          
        },
        err => {
          console.log(err);
          this.snackBar.open('เกิดข้อผิดพลาด กรุณาตรวจสอบแบบฟอร์มอีกครั้ง', '', {
            horizontalPosition: 'right',
            duration: 2000,
            panelClass: ['color-white', 'bg-danger']
          });
          this.isSubmit = false;
        }
      );
    }
  }

  loadData() {
    this.familiesService.create().subscribe((data: any) => {
      this.prefixes = data.prefixes;
      this.genders = data.genders;
      this.occupations = data.occupations;
      this.educations = data.educations;

      if(this.formType === 'CREATE') this.formReady = true;
    })
  }

  loadEditData() {
    if(this.formType === 'CREATE') return;

    this.familiesService.edit(this.route.snapshot.params.id).subscribe((data: any) => {
      this.form.get('house_address').setValue(data.house_address);
      this.form.get('moo').setValue(data.moo);
      this.form.get('gender').setValue(data.gender_id);
      this.form.get('prefix').setValue(data.prefix_id);
      this.form.get('firstname').setValue(data.firstname);
      this.form.get('lastname').setValue(data.lastname);
      this.form.get('occupation').setValue(data.occupation_id);
      this.form.get('education').setValue(data.education_id);
      this.form.get('monthly_income').setValue(data.monthly_income);
      this.form.get('born').setValue(data.born);
      this.form.get('email').setValue(data.email);
      this.form.get('tel').setValue(data.tel);

      this.editMembers = data.members;
      this.formReady = true;
    });
  }

  removeMember(member) {
    if(this.formType === 'EDIT') this.deleted_members.push(this.formBuilder.group({id: member.id}));
    this.members.removeAt(member.index);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      house_address: ['', Validators.required],
      moo: [''],
      gender: ['', Validators.required],
      prefix: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      occupation: ['', Validators.required],
      education: ['', Validators.required],
      monthly_income: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
      ])],
      born: ['', Validators.required],
      email: ['', Validators.email],
      tel: ['', Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,2})?$")],
      members: this.formBuilder.array([]),
      deleted_members: this.formBuilder.array([])
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
      house_address: '',
      gender: '',
      prefix: '',
      firstname: '',
      lastname: '',
      occupation: '',
      education: '',
      monthly_income: '',
      born: '',
      email: '',
      tel: '',
    };
  }

  createValidationMessages() {
    return {
      house_address: {
        required: '*กรุณาระบุบ้านเลขที่'
      },
      gender: {
        required: '*กรุณาเลือกเพศ'
      },
      prefix: {
        required: '*กรุณาเลือกคำนำหน้า'
      },
      firstname: {
        required: '*กรุณาระบุชื่อ'
      },
      lastname: {
        required: '*กรุณาระบุนามสกุล'
      },
      occupation: {
        required: '*กรุณาเลือกอาชีพ'
      },
      education: {
        required: '*กรุณาเลือกการศึกษา'
      },
      monthly_income: {
        required: '*กรุณาระบุรายได้ต่อเดือน',
        pattern: '*กรุณาระบุเป็นตัวเลขเท่านั้น'
      },
      born: {
        required: '*กรุณาระบุวันเกิด'
      },
      email: {
        email: '*รูปแบบอีเมลล์ไม่ถูกต้อง'
      },
      tel: {
        pattern: '*รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
      }
    };
  }

  get members() { return this.form.get('members') as FormArray; }
  get deleted_members() { return this.form.get('deleted_members') as FormArray; }

}
