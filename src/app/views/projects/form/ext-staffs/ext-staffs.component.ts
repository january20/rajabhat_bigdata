import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ext-staffs',
  templateUrl: './ext-staffs.component.html',
  styleUrls: ['./ext-staffs.component.scss']
})
export class ExtStaffsComponent implements OnInit {

  @Input() ext_staffs: FormArray;
  @Input() prefixName;
  @Input() userGroup;
  @Output() extStaffRemoved = new EventEmitter<number>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.ext_staffs.push(this.createExtStaff());
  }

  createExtStaff(): FormGroup {
    return this.formBuilder.group({
      prefix_id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      group_id: ['', Validators.required],
      tel: ['', Validators.compose([
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

}
