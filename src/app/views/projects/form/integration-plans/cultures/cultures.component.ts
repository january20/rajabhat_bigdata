import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrls: ['./cultures.component.scss']
})
export class CulturesComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input('plan') form: FormArray;
  @Input() index; 
  @Input() name;
  @Input() editPlans: Array<Object>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  checked(event) {
    if(event.checked) {
      this.plans.push(this.createPlan());
    } else {
      this.plans.controls = [];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let edit_plans: SimpleChange = changes.editPlans;

    if(this.formType === 'EDIT') {
      this.addEditPlans(edit_plans ? edit_plans.currentValue : null);
    }
  }

  createPlan(plan?: any): FormGroup {
    let activity = plan ? (plan.integration_activities.includes("กิจกรรม") ? plan.integration_activities.substring(plan.integration_activities.search("activity") + 9) : plan.integration_activities) : '';
    
    return this.formBuilder.group({
      id: [plan ? plan.id : null],
      activity: [activity, Validators.required],
      plan: [plan ? plan.plan : '', Validators.required]
    });
  }

  addPlan(event) {
    event.preventDefault();

    this.plans.push(this.createPlan());
  }

  addEditPlans(plans) {
    if(!plans || plans.length === 0) return;
    plans
      .filter(item => item.ref_integration_plan_id === 3)
      .map(plan => {
        this.plans.push(this.createPlan(plan));
      });
  }

  removePlan(index) {
    this.plans.removeAt(index);
  }

  get plans() { return this.form.get('plans') as FormArray; }
}
