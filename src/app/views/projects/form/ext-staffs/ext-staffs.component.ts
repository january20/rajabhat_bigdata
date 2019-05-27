import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ext-staffs',
  templateUrl: './ext-staffs.component.html',
  styleUrls: ['./ext-staffs.component.scss']
})
export class ExtStaffsComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() ext_staffs: FormArray;
  @Input() prefixName;
  @Input() userGroup;
  @Input() editExtStaffs: Array<Object>;
  @Output() extStaffRemoved = new EventEmitter<number>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.formType === 'CREATE') return;

    const staffs: SimpleChange = changes.editExtStaffs;

    if(staffs) {
      this.addEditStaffs(staffs.currentValue);
    }    
  }

  createExtStaff(staff?: any): FormGroup {
    return this.formBuilder.group({
      prefix_id: [staff ? staff.sys_user.prefix_id : '', Validators.required],
      firstname: [staff ? staff.sys_user.firstname : '', Validators.required],
      lastname: [staff ? staff.sys_user.lastname : '', Validators.required],
      group_id: [staff ? staff.sys_user.ref_sys_user_group_id : '', Validators.required],
      tel: [staff ? staff.sys_user.tel : '', Validators.compose([
        Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,2})?$")
      ])]
    });
  }

  addExtStaff(event) {
    event.preventDefault();

    this.ext_staffs.push(this.createExtStaff());
  }

  removeExtStaff(index) {
    this.extStaffRemoved.emit(index);
  }

  addEditStaffs(staffs) {
    staffs.map(staff => {
      this.ext_staffs.push(this.createExtStaff(staff));
    });
  }

}
