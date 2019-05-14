import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../../../shared/abstract-form';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent extends AbstractForm implements OnInit {

  @Input('subject') form;
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
    return { subject_name: '', subject_id: '', plan: '', }
  }

  createValidationMessages() {
    return {
      subject_name: {
        required: '*กรุณาระบุชื่อวิชา'
      },
      subject_id: {
        required: '*กรุณาระบุรหัสวิชา'
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
