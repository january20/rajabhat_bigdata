import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.scss']
})
export class SchemesComponent implements OnInit, OnChanges {

  @Input() schemes: FormArray;
  @Input() projectSchemes;

  constructor() {

   }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    const schemes: SimpleChange = changes.projectSchemes;
    this.addSchemes(schemes.currentValue);
  }


  addSchemes(schemes) {
    if(!schemes) return;
    schemes.map((o, i) => {
      const control = new FormControl(false);
      this.schemes.push(control);
    });
  }

}
