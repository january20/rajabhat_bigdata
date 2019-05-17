import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn } from '@angular/forms';
import { AbstractForm } from './shared/abstract-form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends AbstractForm implements OnInit {

  title: 'เสนอโครงการ' | 'แก้ไขโครงการ';
  formType: 'CREATE' | 'EDIT' = this.route.snapshot.data['formType'];
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
  isSubmit = false;
  // for Edit

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.loadMisc();
    this.buildForm();

    if(this.formType == 'EDIT') {
      this.loadData();
    }

    this.subscribeToFormChanged();    
  }

  loadData() {
    const id = this.route.snapshot.params.id;

    this.projectService.getProject(id).subscribe((data: any) => {
      this.form.get('project_name').setValue(data.project_name);
    });
  }

  submit() {   
    if(confirm('คุณต้องการเสนนอโครงการใช่หรือไม่')) {
      this.isSubmit = true;

      this.projectService.storeProject(this.form.value).subscribe(
        data => {
          setTimeout(() => {
            this.isSubmit = false;
            console.log(data)
          }, 2000);          
        },
        err => {
          setTimeout(() => {
            this.isSubmit = false;
            console.log(err)
          }, 2000);
        }
      );
    }
    
    // console.log(formData)
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
      this.integrationPlans = data.integration_plans;
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
    return { project_name: '', schemes: '', srru_strategies: '', rajabhat_strategies: '', national_strategies: '', faculty_strategy: '', integration_plans: '', history: '', target_group: '', operation_date: '', assessment_method: '', benefits: '', reporting: '', budget: '', file: '' }
  }
  createValidationMessages() {
    return {
      project_name: { required: '*กรุณาระบุชื่อโครงการ' },
      schemes: { required: '*กรุณาเลือกรูปแบบโครงการ' },
      srru_strategies: { required: '*กรุณาเลือกยุทธศาสตร์มหาวิทยาลัยราชภัฏสุรินทร์' },
      rajabhat_strategies: { required: '*กรุณาเลือกยุทธศาสตร์มหาวิทยาลัยราชภัฏ ระยะ 20 ปี' },
      national_strategies: { required: '*กรุณาเลือกยุทธศาสตร์ชาติ ระยะ 20 ปี' },
      faculty_strategy: { required: '*กรุณาระบุยุทธศาสตร์คณะ' },
      integration_plans: { required: '*กรุณาเลือกแผนการบูรณาการ' },
      history: { required: '*กรุณาระบุความเป็นมา/หลักการและเหตุผล' },
      target_group: { required: '*กรุณาระบุกลุ่มเป้าหมาย' },
      operation_date: { required: '*กรุณาระบุวันเวลา และสถานที่ดำเนินการ' },
      assessment_method: { required: '*กรุณาระบุวิธีการประเมินผลโครงการ' },
      benefits: { required: '*กรุณาเลือกประโยชน์' },
      reporting: { required: '*กรุณาระบุการรายงานผล' },
      budget: { required: '*กรุณาระบุงบประมาณ', pattern: '*กรุณาระบุเป็นตัวเลขเท่านั้น' },
      file: { required: '*กรุณาแนบรายละเอียดงบประมาณ' }
    }
  }
  // End Validation Errors //

  buildForm() {
    this.form = this.formBuilder.group({
      // mis_id: [''],
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
      integration_plans: this.formBuilder.array([], this.checkDynamicCheckboxes(1)),
      history: ['', Validators.required],
      objectives: this.formBuilder.array([]),
      activities: this.formBuilder.array([]),
      outputs: this.formBuilder.array([]),
      kpi: this.formBuilder.array([]),
      target_group: ['', Validators.required],
      operation_date: ['', Validators.required],
      alliances: this.formBuilder.array([]),
      assessment_method: ['', Validators.required],
      benefits: this.formBuilder.array([], this.checkDynamicCheckboxes(1)),
      reporting: ['', Validators.required],
      budget: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
      ])],
      file: [null, Validators.required],
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

  // **Handle File //
  onFileChange(event) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          file: reader.result
        });
      }

      this.changeDetector.markForCheck();
    } 
  }
  // End Handle File //

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
  get file() { return this.form.get('file') as FormArray; }
  get integration_plans() { return this.form.get('integration_plans') as FormArray; }
  // End Getter Functions //

  // **Validations Function //
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };  
    return validator;
  }

  checkDynamicCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value.status)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };  
    return validator;
  }
  // End Validations Function //
}
