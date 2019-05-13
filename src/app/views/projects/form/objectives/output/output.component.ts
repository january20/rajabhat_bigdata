import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../../shared/abstract-form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent extends AbstractForm implements OnInit {

  @Input('output') form: FormGroup;
  @Input() index;
  @Output() outputRemoved = new EventEmitter<number>();

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToFormChanged();
  }

  removeOutput() {
    this.outputRemoved.emit(this.index);
  }

  createFormErrors() {
    return { output: '' }
  }
  createValidationMessages() {
    return {
      output: {
        required: 'กรุณาระบุผลลัพธ์'
      }
    }
  }

}
