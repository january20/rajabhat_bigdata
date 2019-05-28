import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-researchs',
  templateUrl: './researchs.component.html',
  styleUrls: ['./researchs.component.scss']
})
export class ResearchsComponent implements OnInit, OnChanges {

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
    let research_name = plan ? (plan.integration_activities.includes("งานวิจัยเรื่อง") ? plan.integration_activities.substring(plan.integration_activities.search("งานวิจัยเรื่อง") + 15, plan.integration_activities.search("สถานะของงานวิจัย") - 1) : plan.integration_activities) : '';
    let research_status = plan ? (plan.integration_activities.includes("สถานะของงานวิจัย") ? plan.integration_activities.substring(plan.integration_activities.search("สถานะของงานวิจัย") + 17) : '') : '';
 
    return this.formBuilder.group({
      id: [plan ? plan.id : null],
      research_name: [research_name, Validators.required],
      research_status: [research_status, Validators.required],
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
      .filter(item => item.ref_integration_plan_id === 2)
      .map(plan => {
        this.plans.push(this.createPlan(plan));
      });
  }

  removePlan(index) {
    this.plans.removeAt(index);
  }

  get plans() { return this.form.get('plans') as FormArray; }

}
