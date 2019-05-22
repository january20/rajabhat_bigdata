import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input('plan') form: FormArray;
  @Input() index; 
  @Input() name;
  @Input() editPlans: Array<Object>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(this.formType === 'CREATE') {
      this.plans.push(this.createPlan());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let edit_plans: SimpleChange = changes.editPlans;

    if(this.formType === 'EDIT') {
      this.addEditPlans(edit_plans ? edit_plans.currentValue : null);
    }
  }

  createPlan(plan?: any): FormGroup {
    let subject_name = plan ? (plan.integration_activities.includes("รายวิชา") ? plan.integration_activities.substring(plan.integration_activities.search("รายวิชา") + 8, plan.integration_activities.search("รหัสวิชา") - 1) : plan.integration_activities) : '';
    let subject_id = plan ? (plan.integration_activities.includes("รหัสวิชา") ? plan.integration_activities.substring(plan.integration_activities.search("รหัสวิชา") + 9) : '') : '';

    return this.formBuilder.group({
      id: [plan ? plan.id : null],
      subject_name: [subject_name, Validators.required],
      subject_id: [subject_id, Validators.required],
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
      .filter(item => item.ref_integration_plan_id === 1)
      .map(plan => {
        this.plans.push(this.createPlan(plan));
      });
  }

  removePlan(index) {
    this.plans.removeAt(index);
  }

  get plans() { return this.form.get('plans') as FormArray; }

}
