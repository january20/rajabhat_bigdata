import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../../shared/abstract-form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss']
})
export class ObjectiveComponent extends AbstractForm implements OnInit {

  @Input('objective') form: FormGroup;
  @Input() index;
  @Output() objectiveRemoved = new EventEmitter<number>();

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToFormChanged();
  }

  removeObjective() {
    this.objectiveRemoved.emit(this.index);
  }

  createFormErrors() {
    return { objective: '' }
  }
  createValidationMessages() {
    return {
      objective: {
        required: 'กรุณาระบุวัตถุประสงค์'
      }
    }
  }

}
