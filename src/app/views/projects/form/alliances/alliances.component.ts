import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alliances',
  templateUrl: './alliances.component.html',
  styleUrls: ['./alliances.component.scss']
})
export class AlliancesComponent implements OnInit {

  @Input() alliances: FormArray;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() { }

  addAlliance() {
    this.alliances.push(this.createAlliance());
  }
  
  createAlliance(): FormGroup {
    return this.formBuilder.group({
      o_name: ['', Validators.required],
      o_participate: ['', Validators.required]
    });
  }

  removeAlliance(index) {
    this.alliances.removeAt(index);
  }

}
