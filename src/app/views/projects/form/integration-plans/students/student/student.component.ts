import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../../../shared/abstract-form';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent extends AbstractForm implements OnInit {

  @Input('student') form;
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
        required: '*กรุณาระบุลักษณะบูรณาการ'
      }
    }
  }

  removePlan() {
    this.planRemoved.emit(this.index);
  }

}
