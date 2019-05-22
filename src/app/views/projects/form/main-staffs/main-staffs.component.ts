import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-staffs',
  templateUrl: './main-staffs.component.html',
  styleUrls: ['./main-staffs.component.scss']
})
export class MainStaffsComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() main_staffs: FormArray;
  @Input() faculty: Array<Object>;
  @Input() mainSubFacultyArr: Array<Object>;
  @Input() mainBranchArr: Array<Object>;
  @Input() mainStaffArr: Array<Object>;
  @Input() editMainStaffs: Array<Object>;
  @Output() staffRemoved = new EventEmitter<number>();
  @Output() subFacultyLoaded = new EventEmitter<Object>();
  @Output() branchLoaded = new EventEmitter<Object>();
  @Output() staffLoaded = new EventEmitter<Object>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if(this.formType === 'CREATE') {
      this.main_staffs.push(this.createStaff());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.formType === 'CREATE') return;

    const staffs: SimpleChange = changes.editMainStaffs;

    if(staffs) {
      this.addEditStaffs(staffs.currentValue);
    }    
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

  createStaff(staff?: any): FormGroup {
    return this.formBuilder.group({
      fac_id: [staff ? staff.mis.department_id : ''],
      sub_fac_id: [staff ? staff.mis.sub_fac_id : ''],
      branch_id: [staff ? staff.mis.program_id : ''],
      mis_id: [staff ? staff.mis.id : '', Validators.required]
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

  addEditStaffs(staffs) {
    staffs.map(staff => {
      this.main_staffs.push(this.createStaff(staff));
    });
  }

}
