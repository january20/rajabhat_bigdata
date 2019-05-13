import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss']
})
export class ObjectivesComponent implements OnInit {

  @Input() objectives: FormArray;
  @Input() activities: FormArray;
  @Input() outputs: FormArray;
  @Input() kpi: FormArray;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addObjective();
    this.addActivity();
    this.addOutput();
    this.addKpi();
  }

  addObjective() {
    this.objectives.push(this.createObjective());
  }
  addActivity() {
    this.activities.push(this.createActivity());
  }
  addOutput() {
    this.outputs.push(this.createOutput());
  }
  addKpi() {
    this.kpi.push(this.createKpi());
  }

  createObjective(): FormGroup {
    return this.formBuilder.group({
      objective: ['', Validators.required]
    });
  }
  createActivity(): FormGroup {
    return this.formBuilder.group({
      activity: ['', Validators.required]
    });
  }
  createOutput(): FormGroup {
    return this.formBuilder.group({
      output: ['', Validators.required]
    });
  }
  createKpi(): FormGroup {
    return this.formBuilder.group({
      kpi: ['', Validators.required]
    });
  }

  removeObjective(index) {
    this.objectives.removeAt(index);
  }
  removeActivity(index) {
    this.activities.removeAt(index);
  }
  removeOutput(index) {
    this.outputs.removeAt(index);
  }
  removeKpi(index) {
    this.kpi.removeAt(index);
  }

}
