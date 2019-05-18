import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractForm } from '../../shared/abstract-form';

@Component({
  selector: 'app-sub-staff',
  templateUrl: './sub-staff.component.html',
  styleUrls: ['./sub-staff.component.scss']
})
export class SubStaffComponent extends AbstractForm implements OnInit {

  @Output() staffRemoved = new EventEmitter<number>();
  @Output() subFacultyLoaded = new EventEmitter<Object>();
  @Output() branchLoaded = new EventEmitter<Object>();
  @Output() staffLoaded = new EventEmitter<Object>();
  @Input('staff') form: FormGroup;
  @Input() index: number;  
  @Input() faculty: Array<Object>;
  @Input() subSubFacultyArr: Array<Object>;
  @Input() subBranchArr: Array<Object>;
  @Input() subStaffArr: Array<Object>;

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  ngOnInit() {
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
