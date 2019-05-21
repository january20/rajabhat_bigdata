import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractForm } from '../../shared/abstract-form';

@Component({
  selector: 'app-sub-staff',
  templateUrl: './sub-staff.component.html',
  styleUrls: ['./sub-staff.component.scss']
})
export class SubStaffComponent extends AbstractForm implements OnInit {
  
  @Input() formType: 'CREATE' | 'EDIT';
  @Input('staff') form: FormGroup;
  @Input() index: number;  
  @Input() faculty: Array<Object>;
  @Input() subSubFacultyArr: Array<Object>;
  @Input() subBranchArr: Array<Object>;
  @Input() subStaffArr: Array<Object>;
  @Output() staffRemoved = new EventEmitter<number>();
  @Output() subFacultyLoaded = new EventEmitter<Object>();
  @Output() branchLoaded = new EventEmitter<Object>();
  @Output() staffLoaded = new EventEmitter<Object>();

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  async ngOnInit() {
    if(this.formType === 'EDIT') {
      await this.subFacultyLoaded.emit({ faculty_id: this.form.get('fac_id').value, index: this.index, type: 2 });
      await this.branchLoaded.emit({ sub_faculty_id: this.form.get('sub_fac_id').value, index: this.index , type: 2});
      await this.staffLoaded.emit({ branch_id: this.form.get('branch_id').value, index: this.index, type: 2 });
    }

    this.subscribeToFormChanged();
  }
  
  loadSubFaculty(event) {
    this.subFacultyLoaded.emit({ faculty_id: event.value, index: this.index, type: 2 });
  }

  loadBranch(event) {
    this.branchLoaded.emit({ sub_faculty_id: event.value, index: this.index, type: 2 });
  }

  loadStaff(event) {
    this.staffLoaded.emit({ branch_id: event.value, index: this.index, type: 2 });
  }

  createFormErrors() {
    return {
      mis_id: ''
    }
  }

  createValidationMessages() {
    return {
      mis_id: {
        required: '*กรุณาเลือกผู้รับผิดชอบหลัก'
      }
    }
  }

  removeStaff() {
    this.staffRemoved.emit(this.index);
  }

}
