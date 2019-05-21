import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.scss']
})
export class SchemesComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() schemes: FormArray;
  @Input() projectSchemes;
  @Input() editSchemes: Array<Object>;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    let schemes: SimpleChange = changes['projectSchemes'];    
    let edit_schemes: SimpleChange = changes['editSchemes'];
    let schemesCurr = schemes ? schemes.currentValue : null;
    let editSchemesCurr = edit_schemes ? edit_schemes.currentValue : null;

    this.addSchemes(schemesCurr); 

    if(this.formType === 'EDIT') {
      this.addEditSchemes(editSchemesCurr);    
    }
  }


  addSchemes(schemes) {
    if(!schemes || schemes.length === 0) return;

    if(schemes) {
      schemes.map((o, i) => {
        const control = new FormControl(false);
        this.schemes.push(control);
      });
    }    
  }

  addEditSchemes(schemes) {
    if(!schemes || schemes.length === 0) return;

    schemes.map(scheme => {
      this.schemes.controls[scheme.id - 1].patchValue(true);
    });    
  }

}
