import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractForm } from '../../shared/abstract-form';

@Component({
  selector: 'app-target-area',
  templateUrl: './target-area.component.html',
  styleUrls: ['./target-area.component.scss']
})
export class TargetAreaComponent extends AbstractForm implements OnInit {

  @Input('target_area') form: FormGroup;
  @Input() index: number;  
  @Input() districts: Array<Object>;
  @Input() subDistrictArr: Array<Object>;
  @Input() villageArr: Array<Object>;
  @Output() targetAreaRemoved = new EventEmitter<number>();
  @Output() subDistrictsLoaded = new EventEmitter<Object>();
  @Output() villagesLoaded = new EventEmitter<Object>();
  

  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToFormChanged();
  }
  
  loadSubDistricts(event) {
    this.subDistrictsLoaded.emit({ district_id: event.value, index: this.index });
  }

  loadVillages(event) {
    this.villagesLoaded.emit({ sub_district_id: event.value, index: this.index });
  }

  createFormErrors() {
    return {
      sub_district_id: [''],
      village_id: [''],
      address: ['']
    }
  }

  createValidationMessages() {
    return {
      sub_district_id: {
        required: '*กรุณาเลือกตำบล'
      },
      village_id: {
        required: '*กรุณาเลือกหมู่บ้าน'
      },
      address: {
        required: '*กรุณาระบุที่อยู่ (หมู่ที่/ชือโรงเรียน/ชื่อวัด/อื่นๆ)'
      }
    }
  }

  removeTargetArea() {
    this.targetAreaRemoved.emit(this.index);
  }

}
