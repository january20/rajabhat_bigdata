import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../../shared/abstract-form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent extends AbstractForm implements OnInit {

  @Input('kpi') form: FormGroup;
  @Input() index;
  @Output() kpiRemoved = new EventEmitter<number>();

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToFormChanged();
  }

  removeKpi() {
    this.kpiRemoved.emit(this.index);
  }

  createFormErrors() {
    return { kpi: '' }
  }
  createValidationMessages() {
    return {
      kpi: {
        required: 'กรุณาระบุตัวชี้วัด'
      }
    }
  }

}
