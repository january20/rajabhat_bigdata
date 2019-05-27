import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss']
})
export class AssessmentFormComponent implements OnInit {

  project: any;
  form: FormGroup;
  isSubmit = false;
  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  async ngOnInit() {
    this.loadData();
  }

  submit() {
    if(confirm('คุณต้องการส่งแบบประเมินใช่หรือไม่')) {
      this.isSubmit = true;

      this.projectService.storeProjectAssessment(this.form.value).subscribe(
        data => {
          this.snackBar.open('ประเมินโครงการสำเร็จ', '', {
            horizontalPosition: 'right',
            duration: 2000,
            panelClass: ['color-white', 'bg-success']
          });
  
          setTimeout(() => {
            this.isSubmit = false;
            this.router.navigateByUrl('/projects/'+this.route.snapshot.params.id);
          }, 2000);
        },
        err => {
          this.snackBar.open('เกิดขข้อผิดพลาด กรุณาตรวจสอบแบบฟอร์มอีกครั้ง', '', {
            horizontalPosition: 'right',
            duration: 2000,
            panelClass: ['color-white', 'bg-danger']
          });
          this.isSubmit = false;
        }
      );
    }

    // console.log(this.form.value);
  }

  loadData() {
    this.projectService.getCreateAssessment(this.route.snapshot.params.id).subscribe((data: any) => {
      this.buildForm(data).then(() => {
        this.project = data;
        this.subscribeToFormChanged();
      });
    });
  }

  async buildForm(data: any) {
    this.form = this.formBuilder.group({
      project_id: [this.route.snapshot.params.id],
      objectives: this.formBuilder.array(this.createData(data.objectives)),
      activities: this.formBuilder.array(this.createData(data.activities)),
      outputs: this.formBuilder.array(this.createData(data.outputs)),
      kpi: this.formBuilder.array(this.createData(data.kpi)),
      result_method: ['', Validators.required],
      result_vibe: ['', Validators.required],
      files: this.formBuilder.array([]),
      problem: ['', Validators.required],
      problem_solving: ['', Validators.required],
      good_point: ['', Validators.required],
      weak_point: ['', Validators.required]
    });
  }

  addFiles(files: File[]) {
    this.files.controls = [];
    files.forEach((file) => {
      const reader = new FileReader();
   
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        this.files.push(this.formBuilder.group({
          filename: [file.name],
          mimeType: [file.type],
          base64: [content]
        }))
      };

      reader.readAsDataURL(file);
    });
  }

  createData(obj): Array<FormGroup> {
    return obj.map(data => {
      return this.formBuilder.group({
        id: [data.id],
        status: ['', Validators.required],
        suggestion: ['']
      });
    });
  }

  // ***Validation Errors //
  createFormErrors() {
    return {
      result_method: '',
      result_vibe: '',
      problem: '',
      problem_solving: '',
      good_point: '',
      weak_point: ''
    }
  }
  createValidationMessages() {
    return {
      result_method: { required: '*กรุณาระบุรูปแบบ/วิธีการจัดกิจกรรมหลัก' },
      result_vibe: { required: '*กรุณาระบุสภาพบรรยากาศในการดำเนินกิจกรรม' },
      problem: { required: '*กรุณาระบุปัญหาและอุปสรรค' },
      problem_solving: { required: '*กรุณาระบุแนวทางในการแก้ไข' },
      good_point: { required: '*กรุณาระบุจุดแข็งของโครงการ' },
      weak_point: { required: '*กรุณาระบุจุดอ่อนของโครงการและโอกาสการพัฒนา' },
    }
  }
  // End Validation Errors //

  subscribeToFormChanged() {
    this.form.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => this.onValueChanged());
  }

  onValueChanged() {
    for(const field in this.formErrors) {
      this.formErrors[field] = '';

      const control = this.form.get(field);

      if((control && !control.valid) && control.dirty) {
        const messages = this.validationMessages[field];

        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

  }

  get files() { return this.form.get('files') as FormArray; }

}
