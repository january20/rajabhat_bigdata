import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-national-strategies',
  templateUrl: './national-strategies.component.html',
  styleUrls: ['./national-strategies.component.scss']
})
export class NationalStrategiesComponent implements OnInit, OnChanges {

  @Input() national_strategies: FormArray;
  @Input() nationalStrategies;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const national_strategies: SimpleChange = changes.nationalStrategies;
    this.addNationalStrategies(national_strategies.currentValue);
  }


  addNationalStrategies(national_strategies) {
    if(!national_strategies) return;
    national_strategies.map((o, i) => {
      const control = new FormControl(false);
      this.national_strategies.push(control);
    });
  }

}
