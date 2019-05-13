import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../../shared/abstract-form';

@Component({
  selector: 'app-ext-staff',
  templateUrl: './ext-staff.component.html',
  styleUrls: ['./ext-staff.component.scss']
})
export class ExtStaffComponent extends AbstractForm implements OnInit {

  @Input() form;
  @Input() index;
  @Input() prefixName;
  @Input() userGroup;
  @Output() extStaffRemoved = new EventEmitter<number>();

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToFormChanged();
  }

  createFormErrors() {
    return {
      prefixname: '',
      firstname: '',
      lastname: '',
      user_group: '',
      tel: ''
    }
  }

  createValidationMessages() {
    return {
      prefixname: {
        required: 'กรุณาเลือกคำนำหน้าชื่อ'
      },
      firstname: {
        required: 'กรุณาระบุชื่อ'
      },
      lastname: {
        required: 'กรุณาระบุนามสกุล'
      },
      user_group: {
        required: 'กรุณาเลือกลุ่ม'
      },
      tel: {
        pattern: 'หมายเลขโทรศัพท์ไม่ถูกต้อง กรุณาระบุใหม่อีกครั้ง'
      }
    }
  }

  removeExtStaff() {
    this.extStaffRemoved.emit(this.index);
  }

}
