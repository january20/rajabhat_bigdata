import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../../shared/abstract-form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss']
})
export class AllianceComponent extends AbstractForm implements OnInit {

  @Input('alliance') form: FormGroup;
  @Input() index;
  @Output() allianceRemoved = new EventEmitter<number>();

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToFormChanged();
  }

  removeAlliance() {
    this.allianceRemoved.emit(this.index);
  }

  createFormErrors() {
    return { o_name: '', o_participate: '' }
  }
  createValidationMessages() {
    return {
      o_name: {
        required: '*กรุณาระบุชื่อองค์กรณ์'
      },
      o_participate: {
        required: '*กรุณาระบุความร่วมมือ'
      }
    }
  }

}
