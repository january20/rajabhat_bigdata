import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sub-staffs',
  templateUrl: './sub-staffs.component.html',
  styleUrls: ['./sub-staffs.component.scss']
})
export class SubStaffsComponent implements OnInit {

  @Input() sub_staffs: FormArray;
  @Input() faculty: Array<Object>;
  @Input() subSubFacultyArr: Array<Object>;
  @Input() subBranchArr: Array<Object>;
  @Input() subStaffArr: Array<Object>;
  @Output() staffRemoved = new EventEmitter<number>();
  @Output() subFacultyLoaded = new EventEmitter<Object>();
  @Output() branchLoaded = new EventEmitter<Object>();
  @Output() staffLoaded = new EventEmitter<Object>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.sub_staffs.push(this.createStaff());
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

    this.sub_staffs.push(this.createStaff());
  }

  removeStaff(index) {
    this.sub_staffs.removeAt(index);
    this.staffRemoved.emit(index);
  }

}
