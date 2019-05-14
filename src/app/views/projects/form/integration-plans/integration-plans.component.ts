import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-integration-plans',
  templateUrl: './integration-plans.component.html',
  styleUrls: ['./integration-plans.component.scss']
})
export class IntegrationPlansComponent implements OnInit, OnChanges {

  @Input() integration_plans: FormArray;
  @Input() integrationPlans;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const integration_plans: SimpleChange = changes.integrationPlans;
    this.addIntegrationPlans(integration_plans.currentValue);
  }

  createIntegrationPlans(id): FormGroup {
    return this.formBuilder.group({
      status: [false],
      id: [id],
      plans: this.formBuilder.array([])
    });
  }
  

  addIntegrationPlans(integration_plans) {
    if(!integration_plans) return;

    integration_plans.map(item => {
      this.integration_plans.push(this.createIntegrationPlans(item.id));
    });
  }

}
