import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AbstractForm } from './shared/abstract-form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends AbstractForm implements OnInit {

  form: FormGroup;
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
  ) {
    super();
  }

  ngOnInit() {
    this.loadMisc();
    this.buildForm();
    this.subscribeToFormChanged();    
  }

  submit() {
    console.log(this.form.value)
  }

  loadMisc() {
    this.projectService.getMiscData().subscribe((data: any) => {
      this.districts = data.districts;
      this.prefixName = data.prefix;
      this.userGroup = data.user_groups;
      this.faculty = data.faculty;
      // this.addSchemes(data.schemes);
      // this.addSrruStrategies(data.srru_strategies);
      // this.addRajabhatStrategies(data.srru_strategies);
      // this.addNationalStrategies(data.rajabhat_strategies);
      // this.addIntegrationPlans(data.integration_plans);
    });
  }

  loadSubDistricts(obj) {
    console.log(obj.index)
    this.projectService.getSubDistricts(obj.district_id).subscribe(data => this.subDistrictArr[obj.index] = data);
  }

  loadVillages(obj) {
    this.projectService.getVillages(obj.sub_district_id).subscribe(data => this.villageArr[obj.index] = data);
  }

  loadSubFaculty(obj) {
    this.projectService.getSubFaculty(obj.faculty_id).subscribe(data => {
      if(obj.type === 1) {
        this.mainSubFacultyArr[obj.index] = data;
      } else if(obj.type === 2) {
        this.subSubFacultyArr[obj.index] = data;
      }
      
    });
  }

  loadBranches(obj) {
    this.projectService.getBranches(obj.sub_faculty_id).subscribe(data => {
      if(obj.type === 1) {
        this.mainBranchArr[obj.index] = data;
      } else if(obj.type === 2) {
        this.subBranchArr[obj.index] = data;
      }
      
    });
  }

  loadStaffs(obj) {
    this.projectService.getStaffs(obj.branch_id).subscribe(data => {
      if(obj.type === 1) {
        this.mainStaffArr[obj.index] = data;
      } else if(obj.type === 2) {
        this.subStaffArr[obj.index] = data;
      }
      
    });
  }

  // ***Validation Errors //
  createFormErrors() {
    return {
      project_name: ''
    }
  }
  createValidationMessages() {
    return {
      project_name: {
        required: 'กรุณาระบุชื่อโครงการ'
      }
    }
  }
  // End Validation Errors //

  buildForm() {
    this.form = this.formBuilder.group({
      project_name: ['', Validators.required],
      target_areas: this.formBuilder.array([]),
      main_staffs: this.formBuilder.array([]),
      // sub_staffs: this.formBuilder.array([
      //   this.createSrruStaff()
      // ]),
      // ext_staffs: this.formBuilder.array([
      //   this.createExtStaff()
      // ]),
      // schemes: this.formBuilder.array([]),
      // srru_strategies: this.formBuilder.array([]),
      // rajabhat_strategies: this.formBuilder.array([]),
      // national_strategies: this.formBuilder.array([]),
      // faculty_strategy: ['', Validators.required],
      // integration_plans: this.formBuilder.array([]),
    });
  }

  // ***Dynamic Target Area Fields //
  removeTargetArea(index): void { 
    this.subDistrictArr.splice(index, 1);
    this.villageArr.splice(index, 1);
    this.subDistrictArr = this.subDistrictArr.filter(val => val);
    this.villageArr = this.villageArr.filter(val => val);
  }
  // End Dynamic Target Area Fields //

  // ***Dynamic Srru Staffs Fields //
  removeMainStaff(index) {
    this.mainSubFacultyArr.splice(index, 1);
    this.mainBranchArr.splice(index, 1);
    this.mainStaffArr.splice(index, 1);      
    this.mainSubFacultyArr = this.mainSubFacultyArr.filter(val => val);
    this.mainBranchArr = this.mainBranchArr.filter(val => val);
    this.mainStaffArr = this.mainStaffArr.filter(val => val);
  }
  removeSubStaff(index) {
    this.subSubFacultyArr.splice(index, 1);
    this.subBranchArr.splice(index, 1);
    this.subStaffArr.splice(index, 1);      
    this.subSubFacultyArr = this.subSubFacultyArr.filter(val => val);
    this.subBranchArr = this.subBranchArr.filter(val => val);
    this.subStaffArr = this.subStaffArr.filter(val => val);
  }
  // End Dynamic Srru Staffs Fields //

  // ***Dynamic External Staffs Fields //
  // removeExtStaff(idx): void { 
  //   this.ext_staffs.removeAt(idx);
  // }
  // End Dynamic External Staffs Fields //

  // ***Dynamic checkbox Fields //
  // addSchemes(schemes) {
  //   this.projectSchemes = schemes;
  //   this.projectSchemes.map((o, i) => {
  //     const control = new FormControl();
  //     this.schemes.push(control);
  //   });
  // }
  // addSrruStrategies(srru_strategies) {
  //   this.srruStrategies = srru_strategies;
  //   this.srruStrategies.map((o, i) => {
  //     const control = new FormControl();
  //     this.srru_strategies.push(control);
  //   });
  // }
  // addRajabhatStrategies(rajabhat_strategies) {
  //   this.rajabhatStrategies = rajabhat_strategies;
  //   this.rajabhatStrategies.map((o, i) => {
  //     const control = new FormControl();
  //     this.rajabhat_strategies.push(control);
  //   });
  // }
  // addNationalStrategies(national_strategies) {
  //   this.nationalStrategies = national_strategies;
  //   this.nationalStrategies.map((o, i) => {
  //     const control = new FormControl();
  //     this.national_strategies.push(control);
  //   });
  // }
  // addIntegrationPlans(plan) {
  //   this.integrationPlans = plan;
  //   this.integrationPlans.map((o, i) => {
  //     const control = new FormControl();
  //     this.integration_plans.push(control);
  //   });
  // }
  // End Dynamic checkbox Fields //

  // integrationPlanCheck(idx, e) {
  //   console.log(idx, 'is', e.target.checked);
  // }

  // ***Getter Functions //  
  get target_areas() { return this.form.get('target_areas') as FormArray; }
  get main_staffs() { return this.form.get('main_staffs') as FormArray; }
  // get sub_staffs() { return this.form.get('sub_staffs') as FormArray; }
  // get ext_staffs() { return this.form.get('ext_staffs') as FormArray; }
  // get schemes() { return this.form.get('schemes') as FormArray; }
  // get srru_strategies() { return this.form.get('srru_strategies') as FormArray; }
  // get rajabhat_strategies() { return this.form.get('rajabhat_strategies') as FormArray; }
  // get national_strategies() { return this.form.get('national_strategies') as FormArray; }
  // get integration_plans() { return this.form.get('integration_plans') as FormArray; }
  // End Getter Functions //
}
