import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  @Input() form;
  @Input() index;
  @Input() prefixes;
  @Input() genders;
  @Input() occupations;
  @Input() educations;
  @Output() memberRemoved = new EventEmitter<number>();

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() { }

  ngOnInit() {
    this.subscribeToFormChanged();
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

}
