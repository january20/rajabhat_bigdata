import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-integration-plans',
  templateUrl: './integration-plans.component.html',
  styleUrls: ['./integration-plans.component.scss']
})
export class IntegrationPlansComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() integration_plans: FormArray;
  @Input() integrationPlans;
  @Input() editPlans: Array<Object>;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let integration_plans: SimpleChange = changes.integrationPlans;
    let edit_plans: SimpleChange = changes.editPlans;

    this.addIntegrationPlans(integration_plans ? integration_plans.currentValue : null);

    if(this.formType === 'EDIT') {
      this.addEditPlans(edit_plans ? edit_plans.currentValue : null);
    }
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

  addEditPlans(plans) {
    if(!plans || plans.length === 0) return;

    plans.map(plan => {
      this.integration_plans.controls[plan.ref_integration_plan_id - 1].patchValue({
        status: true
      });
    });
  }

}
