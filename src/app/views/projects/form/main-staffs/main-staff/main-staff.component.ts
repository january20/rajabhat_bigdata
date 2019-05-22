import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractForm } from '../../shared/abstract-form';

@Component({
  selector: 'app-main-staff',
  templateUrl: './main-staff.component.html',
  styleUrls: ['./main-staff.component.scss']
})
export class MainStaffComponent extends AbstractForm implements OnInit {

  @Input() formType: 'CREATE' | 'EDIT';
  @Output() staffRemoved = new EventEmitter<number>();
  @Output() subFacultyLoaded = new EventEmitter<Object>();
  @Output() branchLoaded = new EventEmitter<Object>();
  @Output() staffLoaded = new EventEmitter<Object>();
  @Input('staff') form: FormGroup;
  @Input() index: number;  
  @Input() faculty: Array<Object>;
  @Input() mainSubFacultyArr: Array<Object>;
  @Input() mainBranchArr: Array<Object>;
  @Input() mainStaffArr: Array<Object>;

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  async ngOnInit() {
    if(this.formType === 'EDIT') {
      await this.subFacultyLoaded.emit({ faculty_id: this.form.get('fac_id').value, index: this.index, type: 1 });
      await this.branchLoaded.emit({ sub_faculty_id: this.form.get('sub_fac_id').value, index: this.index , type: 1});
      await this.staffLoaded.emit({ branch_id: this.form.get('branch_id').value, index: this.index, type: 1 });
    }

    this.subscribeToFormChanged();
  }
  
  loadSubFaculty(event) {
    this.subFacultyLoaded.emit({ faculty_id: event.value, index: this.index, type: 1 });
  }

  loadBranch(event) {
    this.branchLoaded.emit({ sub_faculty_id: event.value, index: this.index, type: 1 });
  }

  loadStaff(event) {
    this.staffLoaded.emit({ branch_id: event.value, index: this.index, type: 1 });
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
