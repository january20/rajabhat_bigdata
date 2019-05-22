import { Component, OnInit, Input } from '@angular/core';
import { AbstractForm } from '../../shared/abstract-form';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent extends AbstractForm implements OnInit {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input('benefit') form;
  @Input() index; 
  @Input() id;
  @Input() name;

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();  

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToFormChanged();
  }

  createFormErrors() {
    return { benefit: '' }
  }
  createValidationMessages() {
    return {
      benefit: {
        required: '*กรุณาระบุประโยชน์'
      }
    }
  }

}
