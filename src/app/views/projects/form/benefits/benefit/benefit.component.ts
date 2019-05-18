import { Component, OnInit, Input } from '@angular/core';
import { AbstractForm } from '../../shared/abstract-form';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent extends AbstractForm implements OnInit {

  @Input('benefit') form;
  @Input() index; 
  @Input() id;
  @Input() name;

  toggle = false;
  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();  

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToFormChanged();
  }

  toggleBenefit(event) {
    // console.log(event.target.checked)
    // console.log(this.toggle)
    this.toggle = !this.toggle;
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
