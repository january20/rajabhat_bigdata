import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alliances',
  templateUrl: './alliances.component.html',
  styleUrls: ['./alliances.component.scss']
})
export class AlliancesComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() alliances: FormArray;
  @Input() editAlliances: Array<Object>;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    let edit_alliances: SimpleChange = changes['editAlliances'];
    let alliancesCurr = edit_alliances ? edit_alliances.currentValue : null;

    if(this.formType === 'EDIT') {
      this.addEditAlliance(alliancesCurr);
    }
    
  }

  addAlliance() {
    this.alliances.push(this.createAlliance());
  }
  
  createAlliance(alliance?: any): FormGroup {
    return this.formBuilder.group({
      o_name: [alliance ? alliance.organization_name : '', Validators.required],
      o_participate: [alliance ? alliance.participation : '', Validators.required]
    });
  }

  addEditAlliance(alliances) {
    if(alliances || alliances.length > 0) {
      alliances.map(alliance => {
        this.alliances.push(this.createAlliance(alliance));
      })
    }
  }
  
  removeAlliance(index) {
    this.alliances.removeAt(index);
  }

}
