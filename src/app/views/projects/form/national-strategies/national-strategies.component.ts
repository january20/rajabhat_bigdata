import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-national-strategies',
  templateUrl: './national-strategies.component.html',
  styleUrls: ['./national-strategies.component.scss']
})
export class NationalStrategiesComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() national_strategies: FormArray;
  @Input() nationalStrategies;
  @Input() editNationalStrategies: Array<Object>;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    let strategies: SimpleChange = changes['nationalStrategies'];    
    let edit_strategies: SimpleChange = changes['editNationalStrategies'];
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
        this.national_strategies.push(control);
      });
    }    
  }

  addEditStrategies(strategies) {
    if(!strategies || strategies.length === 0) return;

    strategies.map(strategy => {
      this.national_strategies.controls[strategy.id - 1].patchValue(true);
    });    
  }

}
