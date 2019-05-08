import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-staffs',
  templateUrl: './main-staffs.component.html',
  styleUrls: ['./main-staffs.component.scss']
})
export class MainStaffsComponent implements OnInit {

  @Input() main_staffs: FormArray;
  @Input() faculty: Array<Object>;
  @Input() mainSubFacultyArr: Array<Object>;
  @Input() mainBranchArr: Array<Object>;
  @Input() mainStaffArr: Array<Object>;
  @Output() staffRemoved = new EventEmitter<number>();
  @Output() subFacultyLoaded = new EventEmitter<Object>();
  @Output() branchLoaded = new EventEmitter<Object>();
  @Output() staffLoaded = new EventEmitter<Object>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.main_staffs.push(this.createStaff());
  }

  loadSubFaculty(event) {
    this.subFacultyLoaded.emit(event);
  }

  loadBranch(event) {
    this.branchLoaded.emit(event);
  }

  loadStaff(event) {
    this.staffLoaded.emit(event);
  }

  createStaff(): FormGroup {
    return this.formBuilder.group({
      mis_id: ['', Validators.required]
    });
  }

  addStaff(event) {
    event.preventDefault();

    this.main_staffs.push(this.createStaff());
  }

  removeStaff(index) {
    this.main_staffs.removeAt(index);
    this.staffRemoved.emit(index);
  }

}
