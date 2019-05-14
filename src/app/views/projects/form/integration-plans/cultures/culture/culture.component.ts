import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../../../shared/abstract-form';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.scss']
})
export class CultureComponent extends AbstractForm implements OnInit {

  @Input('culture') form;
  @Input() index;
  @Output() planRemoved = new EventEmitter<number>();

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToFormChanged();
  }

  createFormErrors() {
    return { activity: '', plan: '', }
  }

  createValidationMessages() {
    return {
      activity: {
        required: '*กรุณาระบุกิจกรรม'
      },
      plan: {
        required: '*กรุณาระบุแผนการบูรณาการ'
      }
    }
  }

  removePlan() {
    this.planRemoved.emit(this.index);
  }

}
