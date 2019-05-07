import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
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
  // for target_areas
  districts: any;
  subDistrictArr = [];
  villageArr = [];
  //for staff
  faculty: any;
  prefixName: any;
  userGroup: any;
  mainSubFacultyArr = [];
  mainBranchArr = [];
  mainStaffArr = [];
  subSubFacultyArr = [];
  subBranchArr = [];
  subStaffArr = [];
  // strategies
  projectSchemes: Array<Object>;
  srruStrategies: Array<Object>;
  rajabhatStrategies: Array<Object>;
  nationalStrategies: Array<Object>;
  // plan
  integrationPlans: Array<Object>;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.detectFormValue();
    this.loadMisc();
  }

  submit() {
    console.log(this.projectForm.value)
  }

  loadMisc() {
    this.projectService.getMiscData().subscribe((data: any) => {
      this.districts = data.districts;
      this.prefixName = data.prefix;
      this.userGroup = data.user_groups;
      this.faculty = data.faculty;
      this.addSchemes(data.schemes);
      this.addSrruStrategies(data.srru_strategies);
      this.addRajabhatStrategies(data.srru_strategies);
      this.addNationalStrategies(data.rajabhat_strategies);
      this.addIntegrationPlans(data.integration_plans);
    });
  }

  loadSubDistricts(e, idx) {
    this.projectService.getSubDistricts(e.target.value).subscribe(data => this.subDistrictArr[idx] = data);
  }

  loadVillages(e, idx) {
    this.projectService.getVillages(e.target.value).subscribe(data => this.villageArr[idx] = data);
  }

  loadSubFaculty(e, idx, type) {
    this.projectService.getSubFaculty(e.target.value).subscribe(data => {
      if(type === 1) {
        this.mainSubFacultyArr[idx] = data;
      } else if(type === 2) {
        this.subSubFacultyArr[idx] = data;
      }
      
    });
  }

  loadBranches(e, idx, type) {
    this.projectService.getBranches(e.target.value).subscribe(data => {
      if(type === 1) {
        this.mainBranchArr[idx] = data;
      } else if(type === 2) {
        this.subBranchArr[idx] = data;
      }
      
    });
  }

  loadStaffs(e, idx, type) {
    this.projectService.getStaffs(e.target.value).subscribe(data => {
      if(type === 1) {
        this.mainStaffArr[idx] = data;
      } else if(type === 2) {
        this.subStaffArr[idx] = data;
      }
      
    });
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

      // console.log(control)
      // console.log(this.target_areas.at(0).get('address').errors);

      if(control && !control.valid && control.dirty) {
        const messages = this.validationMessages[field];
        this.formErrors[field] += messages['required'];
        // for(const key in control.errors) {
          
        //   this.formErrors[field] += messages[key] + ' ';
        // }
      }
    }

    // if(!this.target_areas.valid && this.target_areas.dirty) {
    //   const messages = this.validationMessages['target_areas'];
    //   this.formErrors['target_areas'] += messages['required'];
    // }
    // if(!this.main_staffs.valid && this.main_staffs.dirty) {
    //   const messages = this.validationMessages['main_staffs'];
    //   this.formErrors['main_staffs'] += messages['required'];
    // }
    // if(!this.sub_staffs.valid && this.sub_staffs.dirty) {
    //   const messages = this.validationMessages['sub_staffs'];
    //   this.formErrors['sub_staffs'] += messages['required'];
    // }
    // if(!this.ext_staffs.valid && this.ext_staffs.dirty) {
    //   const messages = this.validationMessages['ext_staffs'];
    //   this.formErrors['ext_staffs'] += messages['required'];
    // }
  }
  // End Detect Form Changed //

  // ***Validation Errors //
  createFormErrors(): Object {
    return {
      project_name: '',
      target_areas: '',
      main_staffs: '',
      sub_staffs: '',
      ext_staffs: '',
      schemes: '',
      srru_strategies: '',
      rajabhat_strategies: '',
      national_strategies: '',
      faculty_strategy: '',
      integration_plans: ''
    }
  }
  createValidationMessages(): Object {
    return {
      project_name: {
        required: 'กรุณาระบุชื่อโครงการ'
      },
      target_areas: {
        required: 'กรุณากรอกข้อมูลให้ครบ'
      },
      main_staffs: {
        required: 'กรุณากรอกข้อมูลให้ครบ'
      },
      sub_staffs: {
        required: 'กรุณากรอกข้อมูลให้ครบ'
      },
      ext_staffs: {
        required: 'กรุณากรอกข้อมูลให้ครบ'
      },
      schemes: {
        required: 'กรุณาเลือกประเภทโครงการ'
      },
      srru_strategies: {
        required: 'กรุณาเลือกยุทธศาสตร์ราชภัฏสุรินทร์'
      },
      rajabhat_strategies: {
        required: 'กรุณาเลือกยุทธศาสตร์ราชภัฏ'
      },
      national_strategies: {
        required: 'กรุณาเลือกยุทธศาสตร์ชาติ'
      },
      faculty_strategy: {
        required: 'กรุณาระบุยุทธศาสตร์คณะ'
      },
      integration_plans: {
        required: 'กรุณาเลือกแผนการบูรณาการ'
      },
    }
  }
  // End Validation Errors //

  buildForm() {
    this.projectForm = this.formBuilder.group({
      project_name: ['', Validators.required],
      target_areas: this.formBuilder.array([
        this.createTargetArea()
      ]),
      main_staffs: this.formBuilder.array([
        this.createSrruStaff()
      ]),
      sub_staffs: this.formBuilder.array([
        this.createSrruStaff()
      ]),
      ext_staffs: this.formBuilder.array([
        this.createExtStaff()
      ]),
      schemes: this.formBuilder.array([]),
      srru_strategies: this.formBuilder.array([]),
      rajabhat_strategies: this.formBuilder.array([]),
      national_strategies: this.formBuilder.array([]),
      faculty_strategy: ['', Validators.required],
      integration_plans: this.formBuilder.array([]),
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
    this.subDistrictArr.splice(idx, 1);
    this.villageArr.splice(idx, 1);
    this.subDistrictArr = this.subDistrictArr.filter(val => val);
    this.villageArr = this.villageArr.filter(val => val);
  }
  // End Dynamic Target Area Fields //

  // ***Dynamic Srru Staffs Fields //
  createSrruStaff(): FormGroup {
    return this.formBuilder.group({
      mis_id: ['', Validators.required]
    });
  }
  addSrruStaff(type): void {
    if(type === 1) {
      this.main_staffs.push(this.createSrruStaff());
    } else if(type === 2) {
      this.sub_staffs.push(this.createSrruStaff());
    }    
  }
  removeSrruStaff(idx, type): void { 
    if(type === 1) {
      this.main_staffs.removeAt(idx);
      this.mainSubFacultyArr.splice(idx, 1);
      this.mainBranchArr.splice(idx, 1);
      this.mainStaffArr.splice(idx, 1);      
      this.mainSubFacultyArr = this.mainSubFacultyArr.filter(val => val);
      this.mainBranchArr = this.mainBranchArr.filter(val => val);
      this.mainStaffArr = this.mainStaffArr.filter(val => val);
    } else if(type === 2) {
      this.sub_staffs.removeAt(idx);
      this.subSubFacultyArr.splice(idx, 1);
      this.subBranchArr.splice(idx, 1);
      this.subStaffArr.splice(idx, 1);      
      this.subSubFacultyArr = this.subSubFacultyArr.filter(val => val);
      this.subBranchArr = this.subBranchArr.filter(val => val);
      this.subStaffArr = this.subStaffArr.filter(val => val);
    }
  }
  // End Dynamic Srru Staffs Fields //

  // ***Dynamic External Staffs Fields //
  createExtStaff(): FormGroup {
    return this.formBuilder.group({
      prefix_id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      group_id: ['', Validators.required],
      tel: ['', Validators.required],
    });
  }
  addExtStaff(): void { this.ext_staffs.push(this.createExtStaff()); }
  removeExtStaff(idx): void { 
    this.ext_staffs.removeAt(idx);
  }
  // End Dynamic External Staffs Fields //

  // ***Dynamic checkbox Fields //
  addSchemes(schemes) {
    this.projectSchemes = schemes;
    schemes.map((o, i) => {
      const control = new FormControl();
      this.schemes.push(control);
    });
  }
  addSrruStrategies(srru_strategies) {
    this.srruStrategies = srru_strategies;
    srru_strategies.map((o, i) => {
      const control = new FormControl();
      this.srru_strategies.push(control);
    });
  }
  addRajabhatStrategies(rajabhat_strategies) {
    this.rajabhatStrategies = rajabhat_strategies;
    rajabhat_strategies.map((o, i) => {
      const control = new FormControl();
      this.rajabhat_strategies.push(control);
    });
  }
  addNationalStrategies(national_strategies) {
    this.nationalStrategies = national_strategies;
    national_strategies.map((o, i) => {
      const control = new FormControl();
      this.national_strategies.push(control);
    });
  }
  addIntegrationPlans(plan) {
    this.integrationPlans = plan;
    plan.map((o, i) => {
      const control = new FormControl();
      this.integration_plans.push(control);
    });
  }
  // End Dynamic checkbox Fields //

  // ***Getter Functions //  
  get target_areas() { return this.projectForm.get('target_areas') as FormArray; }
  get main_staffs() { return this.projectForm.get('main_staffs') as FormArray; }
  get sub_staffs() { return this.projectForm.get('sub_staffs') as FormArray; }
  get ext_staffs() { return this.projectForm.get('ext_staffs') as FormArray; }
  get schemes() { return this.projectForm.get('schemes') as FormArray; }
  get srru_strategies() { return this.projectForm.get('srru_strategies') as FormArray; }
  get rajabhat_strategies() { return this.projectForm.get('rajabhat_strategies') as FormArray; }
  get national_strategies() { return this.projectForm.get('national_strategies') as FormArray; }
  get integration_plans() { return this.projectForm.get('integration_plans') as FormArray; }
  // End Getter Functions //
}
