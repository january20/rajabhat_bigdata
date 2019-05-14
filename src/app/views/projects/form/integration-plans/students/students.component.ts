import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  @Input('plan') form: FormArray;
  @Input() index; 
  @Input() name;

  toggle = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.plans.push(this.createPlan());
  }

  createPlan(): FormGroup {
    return this.formBuilder.group({
      activity: ['', Validators.required],
      plan: ['', Validators.required]
    });
  }

  addPlan(event) {
    event.preventDefault();

    this.plans.push(this.createPlan());
  }

  removePlan(index) {
    this.plans.removeAt(index);
  }

  togglePlan() {
    this.toggle = !this.toggle;
  }

  get plans() { return this.form.get('plans') as FormArray; }

}
