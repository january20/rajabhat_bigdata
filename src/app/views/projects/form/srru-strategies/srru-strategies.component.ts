import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-srru-strategies',
  templateUrl: './srru-strategies.component.html',
  styleUrls: ['./srru-strategies.component.scss']
})
export class SrruStrategiesComponent implements OnInit, OnChanges {

  @Input() srru_strategies: FormArray;
  @Input() srruStrategies;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const srru_strategies: SimpleChange = changes.srruStrategies;
    this.addSrruStrategies(srru_strategies.currentValue);
  }


  addSrruStrategies(srru_strategies) {
    if(!srru_strategies) return;
    srru_strategies.map((o, i) => {
      const control = new FormControl(false);
      this.srru_strategies.push(control);
    });
  }

}
