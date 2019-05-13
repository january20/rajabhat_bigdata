import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../../shared/abstract-form';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-oactivity',
  templateUrl: './oactivity.component.html',
  styleUrls: ['./oactivity.component.scss']
})
export class OactivityComponent extends AbstractForm implements OnInit {

  @Input('activity') form: FormGroup;
  @Input() index;
  @Output() activityRemoved = new EventEmitter<number>();

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToFormChanged();
  }

  removeActivity() {
    this.activityRemoved.emit(this.index);
  }

  createFormErrors() {
    return { activity: '' }
  }
  createValidationMessages() {
    return {
      activity: {
        required: 'กรุณาระบุกิจกรรม'
      }
    }
  }

}
