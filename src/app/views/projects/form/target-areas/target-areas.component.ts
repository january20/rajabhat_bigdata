import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-target-areas',
  templateUrl: './target-areas.component.html',
  styleUrls: ['./target-areas.component.scss']
})
export class TargetAreasComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() target_areas: FormArray;
  @Input() districts: Array<Object>;
  @Input() subDistrictArr: Array<Object>;
  @Input() villageArr: Array<Object>;
  @Input() editTargetAreas: Array<Object>;
  @Output() subDistrictsLoaded = new EventEmitter<Object>();
  @Output() villagesLoaded = new EventEmitter<Object>();
  @Output() targetAreaRemoved = new EventEmitter<number>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.formType === 'CREATE') {
      this.target_areas.push(this.createTargetArea());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.formType === 'CREATE') return;

    const areas: SimpleChange = changes.editTargetAreas;

    if(areas) {
      this.addEditAreas(areas.currentValue);
    }    
  }

  loadSubDistricts(event) {
    this.subDistrictsLoaded.emit(event);
  }

  loadVillages(event) {
    this.villagesLoaded.emit(event);
  }

  createTargetArea(area?: any): FormGroup {
    return this.formBuilder.group({
      district_id: [area ? (area.sub_district ? area.sub_district.district_id : area.village.district_id) : ''],
      sub_district_id: [area ? area.sub_district_id : '', Validators.required],
      village_id: [area ? (area.village_id ? area.village_id : '') : '', Validators.required],
      address: [area ? area.target_area : '']
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

  addEditAreas(areas) {
    areas.map(area => {
      this.target_areas.push(this.createTargetArea(area));
    });
  }

}
