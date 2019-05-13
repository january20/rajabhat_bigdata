import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-rajabhat-strategies',
  templateUrl: './rajabhat-strategies.component.html',
  styleUrls: ['./rajabhat-strategies.component.scss']
})
export class RajabhatStrategiesComponent implements OnInit, OnChanges {

  @Input() rajabhat_strategies: FormArray;
  @Input() rajabhatStrategies;

  constructor() {

   }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const rajabhat_strategies: SimpleChange = changes.rajabhatStrategies;
    this.addRajabhatStrategies(rajabhat_strategies.currentValue);
  }


  addRajabhatStrategies(rajabhat_strategies) {
    if(!rajabhat_strategies) return;
    rajabhat_strategies.map((o, i) => {
      const control = new FormControl(false);
      this.rajabhat_strategies.push(control);
    });
  }

}
