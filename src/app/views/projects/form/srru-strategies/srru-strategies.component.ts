import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-srru-strategies',
  templateUrl: './srru-strategies.component.html',
  styleUrls: ['./srru-strategies.component.scss']
})
export class SrruStrategiesComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() srru_strategies: FormArray;
  @Input() srruStrategies;
  @Input() editSrruStrategies: Array<Object>;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    let strategies: SimpleChange = changes['srruStrategies'];    
    let edit_strategies: SimpleChange = changes['editSrruStrategies'];
    let strategiesCurr = strategies ? strategies.currentValue : null;
    let editStrategiesCurr = edit_strategies ? edit_strategies.currentValue : null;

    this.addStrategies(strategiesCurr); 

    if(this.formType === 'EDIT') {
      this.addEditStrategies(editStrategiesCurr);    
    }

  }

  addStrategies(strategies) {
    if(!strategies || strategies.length === 0) return;

    if(strategies) {
      strategies.map((o, i) => {
        const control = new FormControl(false);
        this.srru_strategies.push(control);
      });
    }    
  }

  addEditStrategies(strategies) {
    if(!strategies || strategies.length === 0) return;

    strategies.map(strategy => {
      this.srru_strategies.controls[strategy.id - 1].patchValue(true);
    });    
  }

}
