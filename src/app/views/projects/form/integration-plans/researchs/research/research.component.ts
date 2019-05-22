import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractForm } from '../../../shared/abstract-form';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent extends AbstractForm implements OnInit {

  @Input('research') form;
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
    return { research_name: '', research_status: '', plan: '', }
  }

  createValidationMessages() {
    return {
      research_name: {
        required: '*กรุณาระบุชื่องานวิจัย'
      },
      research_status: {
        required: '*กรุณาเลือกสถานะงานวิจัย'
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
