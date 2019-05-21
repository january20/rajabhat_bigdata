import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-rajabhat-strategies',
  templateUrl: './rajabhat-strategies.component.html',
  styleUrls: ['./rajabhat-strategies.component.scss']
})
export class RajabhatStrategiesComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() rajabhat_strategies: FormArray;
  @Input() rajabhatStrategies;
  @Input() editRajabhatStrategies: Array<Object>;

  constructor() {

   }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    let strategies: SimpleChange = changes['rajabhatStrategies'];    
    let edit_strategies: SimpleChange = changes['editRajabhatStrategies'];
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
        this.rajabhat_strategies.push(control);
      });
    }    
  }

  addEditStrategies(strategies) {
    if(!strategies || strategies.length === 0) return;

    strategies.map(strategy => {
      this.rajabhat_strategies.controls[strategy.id - 1].patchValue(true);
    });    
  }

}
