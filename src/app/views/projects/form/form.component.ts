import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  projectForm: FormGroup;
  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();
  districts: any;
  sub_districtArr = [];
  villageArr = [];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.detectFormValue();
    this.loadDistricts();
  }

  submit() {
    console.log(this.projectForm.value)
  }

  loadDistricts() {
    this.projectService.getDistricts().subscribe(data => this.districts = data);
  }

  loadSubDistricts(e, idx) {
    this.projectService.getSubDistricts(e.target.value).subscribe(data => this.sub_districtArr[idx] = data);
  }

  loadVillages(e, idx) {
    this.projectService.getVillages(e.target.value).subscribe(data => this.villageArr[idx] = data);
  }

  // ***Detect Form Changed //
  detectFormValue() {
    this.projectForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => this.valueChanged());
  }
  valueChanged() {
    if(!this.projectForm) return;

    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.projectForm.get(field);

      console.log(control)
      console.log(this.target_areas.at(0).get('address').errors);

      if(control && !control.valid) {
        const messages = this.validationMessages[field];

        for(const key in control.errors) {
          
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  // End Detect Form Changed //

  // ***Validation Errors //
  createFormErrors(): Object {
    return {
      project_name: '',
      target_areas: '',
    }
  }
  createValidationMessages(): Object {
    return {
      project_name: {
        required: 'กรุณาระบุชื่อโครงการ'
      },
      target_areas: {
        required: 'กรุณากรอกข้อมูลให้ครบ'
      }
    }
  }
  // End Validation Errors //

  buildForm() {
    this.projectForm = this.formBuilder.group({
      project_name: ['', Validators.required],
      target_areas: this.formBuilder.array([
        this.createTargetArea()
      ])
    });
  }

  // ***Dynamic Target Area Fields //
  createTargetArea(): FormGroup {
    return this.formBuilder.group({
      sub_district_id: ['', Validators.required],
      village_id: ['', Validators.required],
      address: ['', Validators.required]
    });
  }
  addTargetArea(): void { this.target_areas.push(this.createTargetArea()); }
  removeTargetArea(idx): void { 
    this.target_areas.removeAt(idx);
    this.sub_districtArr.splice(idx, 1);
    this.villageArr.splice(idx, 1);
    this.sub_districtArr = this.sub_districtArr.filter(val => val);
    this.villageArr = this.villageArr.filter(val => val);
  }
  // End Dynamic Target Area Fields //

  // ***Getter Functions //
  get target_areas() { return this.projectForm.get('target_areas') as FormArray; }
  get project_name() { return this.projectForm.get('project_name') as FormArray; }
  // End Getter Functions //
}
