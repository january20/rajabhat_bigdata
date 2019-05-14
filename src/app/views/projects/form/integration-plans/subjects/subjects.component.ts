import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  @Input('plan') form;
  @Input() index; 
  @Input() name;

  toggle = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.form.push(this.createPlan());
  }

  createPlan(): FormGroup {
    return this.formBuilder.group({
      subject_name: ['', Validators.required],
      subject_id: ['', Validators.required],
      plan: ['', Validators.required]
    });
  }

  addPlan(event) {
    event.preventDefault();

    this.form.push(this.createPlan());
  }

  removePlan(index) {
    this.form.removeAt(index);
  }

  togglePlan() {
    this.toggle = !this.toggle;
  }

}
