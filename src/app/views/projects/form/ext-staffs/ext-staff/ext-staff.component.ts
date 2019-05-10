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

  constructor() {
    super();
  }

  ngOnInit() {
  }

  removeExtStaff() {
    this.extStaffRemoved.emit(this.index);
  }

}
