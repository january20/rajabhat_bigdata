import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-target-areas',
  templateUrl: './target-areas.component.html',
  styleUrls: ['./target-areas.component.scss']
})
export class TargetAreasComponent implements OnInit {
  
  @Input() target_areas: FormArray;
  @Input() districts: Array<Object>;
  @Input() subDistrictArr: Array<Object>;
  @Input() villageArr: Array<Object>;
  @Output() subDistrictsLoaded = new EventEmitter<Object>();
  @Output() villagesLoaded = new EventEmitter<Object>();
  @Output() targetAreaRemoved = new EventEmitter<number>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.target_areas.push(this.createTargetArea());
  }

  loadSubDistricts(event) {
    this.subDistrictsLoaded.emit(event);
  }

  loadVillages(event) {
    this.villagesLoaded.emit(event);
  }

  createTargetArea(): FormGroup {
    return this.formBuilder.group({
      sub_district_id: ['', Validators.required],
      village_id: ['', Validators.required],
      address: ['']
    });
  }

  addTargetArea(event) {
    event.preventDefault();

    this.target_areas.push(this.createTargetArea());
  }

  removeTargetArea(index) {
    this.target_areas.removeAt(index);
    this.targetAreaRemoved.emit(index);
  }

}
