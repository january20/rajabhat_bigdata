import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn } from '@angular/forms';
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
      this.projectSchemes = data.schemes;
      this.srruStrategies = data.srru_strategies;
      this.nationalStrategies = data.national_strategies;
      this.rajabhatStrategies = data.rajabhat_strategies;
    });
  }

  loadSubDistricts(obj) {
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

  loadBranch(obj) {
    this.projectService.getBranches(obj.sub_faculty_id).subscribe(data => {
      if(obj.type === 1) {
        this.mainBranchArr[obj.index] = data;
      } else if(obj.type === 2) {
        this.subBranchArr[obj.index] = data;
      }
    });
  }

  loadStaff(obj) {
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
    return { project_name: '', schemes: '', srru_strategies: '', rajabhat_strategies: '', national_strategies: '', faculty_strategy: '', history: '', target_group: '', operation_date: '', assessment_method: '', reporting: '', budget: '', file: '' }
  }
  createValidationMessages() {
    return {
      project_name: {
        required: 'กรุณาระบุชื่อโครงการ'
      },
      schemes: {
        required: 'กรุณาเลือกรูปแบบโครงการ'
      },
      srru_strategies: {
        required: 'กรุณาเลือกยุทธศาสตร์มหาวิทยาลัยราชภัฏสุรินทร์'
      },
      rajabhat_strategies: {
        required: 'กรุณาเลือกยุทธศาสตร์มหาวิทยาลัยราชภัฏ ระยะ 20 ปี'
      },
      national_strategies: {
        required: 'กรุณาเลือกยุทธศาสตร์ชาติ ระยะ 20 ปี'
      },
      faculty_strategy: {
        required: 'กรุณาระบุยุทธศาสตร์คณะ'
      },
      history: {
        required: 'กรุณาระบุความเป็นมา/หลักการและเหตุผล'
      },
      target_group: {
        required: 'กรุณาระบุกลุ่มเป้าหมาย'
      },
      operation_date: {
        required: 'กรุณาระบุวันเวลา และสถานที่ดำเนินการ'
      },
      assessment_method: {
        required: 'กรุณาระบุวิธีการประเมินผลโครงการ'
      },
      reporting: {
        required: 'กรุณาระบุการรายงานผล'
      },
      budget: {
        required: 'กรุณาระบุงบประมาณ'
      },
      file: {
        required: 'กรุณาแนบรายละเอียดงบประมาณ'
      }
    }
  }
  // End Validation Errors //

  buildForm() {
    this.form = this.formBuilder.group({
      project_name: ['', Validators.required],
      target_areas: this.formBuilder.array([]),
      main_staffs: this.formBuilder.array([]),
      sub_staffs: this.formBuilder.array([]),
      ext_staffs: this.formBuilder.array([]),
      schemes: this.formBuilder.array([], this.minSelectedCheckboxes(1)),
      srru_strategies: this.formBuilder.array([], this.minSelectedCheckboxes(1)),
      rajabhat_strategies: this.formBuilder.array([], this.minSelectedCheckboxes(1)),
      national_strategies: this.formBuilder.array([], this.minSelectedCheckboxes(1)),
      faculty_strategy: ['', Validators.required],
      // integration_plans: this.formBuilder.array([]),
      history: ['', Validators.required],
      objectives: this.formBuilder.array([]),
      activities: this.formBuilder.array([]),
      outputs: this.formBuilder.array([]),
      kpi: this.formBuilder.array([]),
      target_group: ['', Validators.required],
      operation_date: ['', Validators.required],
      alliances: this.formBuilder.array([]),
      assessment_method: ['', Validators.required],
      benefits: this.formBuilder.array([]),
      reporting: ['', Validators.required],
      budget: ['', Validators.required],
      file: null,
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
  removeExtStaff(idx): void { 
    this.ext_staffs.removeAt(idx);
  }
  // End Dynamic External Staffs Fields //

  // ***Getter Functions //  
  get target_areas() { return this.form.get('target_areas') as FormArray; }
  get main_staffs() { return this.form.get('main_staffs') as FormArray; }
  get sub_staffs() { return this.form.get('sub_staffs') as FormArray; }
  get ext_staffs() { return this.form.get('ext_staffs') as FormArray; }
  get schemes() { return this.form.get('schemes') as FormArray; }
  get srru_strategies() { return this.form.get('srru_strategies') as FormArray; }
  get rajabhat_strategies() { return this.form.get('rajabhat_strategies') as FormArray; }
  get national_strategies() { return this.form.get('national_strategies') as FormArray; }
  get objectives() { return this.form.get('objectives') as FormArray; }
  get activities() { return this.form.get('activities') as FormArray; }
  get outputs() { return this.form.get('outputs') as FormArray; }
  get kpi() { return this.form.get('kpi') as FormArray; }
  get alliances() { return this.form.get('alliances') as FormArray; }
  get benefits() { return this.form.get('benefits') as FormArray; }
  // get integration_plans() { return this.form.get('integration_plans') as FormArray; }
  // End Getter Functions //

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };  
    return validator;
  }
}