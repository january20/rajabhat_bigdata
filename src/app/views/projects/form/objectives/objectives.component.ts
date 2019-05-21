import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss']
})
export class ObjectivesComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() objectives: FormArray;
  @Input() activities: FormArray;
  @Input() outputs: FormArray;
  @Input() kpi: FormArray;
  @Input() editObjectives: any;
  @Input() editActivities: any;
  @Input() editOutputs: any;
  @Input() editKpi: any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if(this.formType === 'CREATE') {
      this.addObjective();
      this.addActivity();
      this.addOutput();
      this.addKpi();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let objectives: SimpleChange = changes['editObjectives'];
    let activities: SimpleChange = changes['editActivities'];    
    let outputs: SimpleChange = changes['editOutputs'];    
    let kpi: SimpleChange = changes['editKpi'];    
    let objectivesCurr = objectives ? objectives.currentValue : null;
    let activitiesCurr = activities ? activities.currentValue : null;
    let outputsCurr = outputs ? outputs.currentValue : null;
    let kpiCurr = kpi ? kpi.currentValue : null;

    if(this.formType === 'EDIT') {
      this.editObjectiveGroup(objectivesCurr);    
      this.editActivityGroup(activitiesCurr);  
      this.editOutputGroup(outputsCurr);  
      this.editKpiGroup(kpiCurr);  
    }

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

  createObjective(objective?: any): FormGroup {
    return this.formBuilder.group({
      objective: [objective ? objective.objective : '', Validators.required]
    });
  }
  createActivity(activity?: any): FormGroup {
    return this.formBuilder.group({
      activity: [activity ? activity.activity : '', Validators.required]
    });
  }
  createOutput(output?: any): FormGroup {
    return this.formBuilder.group({
      output: [output ? output.output : '', Validators.required]
    });
  }
  createKpi(kpi?: any): FormGroup {
    return this.formBuilder.group({
      kpi: [kpi ? kpi.kpi : '', Validators.required]
    });
  }

  editObjectiveGroup(objectives) {
    if(!objectives) return;

    objectives.map(objective => {
      this.objectives.push(this.createObjective(objective));
    });
  }

  editActivityGroup(activities) {
    if(!activities) return;

    activities.map(activity => {
      this.activities.push(this.createActivity(activity));
    });
  }

  editOutputGroup(outputs) {
    if(!outputs) return;

    outputs.map(output => {
      this.outputs.push(this.createOutput(output));
    });
  }

  editKpiGroup(kpi) {
    if(!kpi) return;

    kpi.map(k => {
      this.kpi.push(this.createKpi(k));
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
