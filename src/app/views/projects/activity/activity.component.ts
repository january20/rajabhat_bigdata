import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  project: Array<Object>;
  form: FormGroup;
  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();
  isSubmit = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadData();
    this.subscribeToFormChanged();
  }

  submit() {
    this.isSubmit = true;

    this.projectService.storeProjectActivity(this.form.value).subscribe(
      res => {
        this.snackBar.open('รายงานกิจกรรมสำเร็จ', '', {
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

  loadData() {
    this.projectService.getCreateActivity(this.route.snapshot.params.id).subscribe((data: any) => this.project = data);
  }
  
  addFiles(files: File[]) {
    this.files.controls = [];
    files.forEach((file, index) => {
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

  buildForm() {
    this.form = this.formBuilder.group({
      id: [this.route.snapshot.params.id],
      name: ['', Validators.required],
      description: ['', Validators.required],
      objective: ['', Validators.required],
      objective_note: [''],
      kpi: ['', Validators.required],
      kpi_note: [''],
      budget: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
      ])],
      files: this.formBuilder.array([])
    });
  }

  get files() { return this.form.get('files') as FormArray; }

  // ***Validation Errors //
  createFormErrors() {
    return { name: '', description: '', objective: '', kpi: '', budget: ''}
  }
  createValidationMessages() {
    return {
      name: { required: '*กรุณาระบุชื่อกิจกรรม' },
      description: { required: '*กรุณาระบุรายละเอียด' },
      objective: { required: '*กรุณาเลือกวัตถุประสงค์' },
      kpi: { required: '*กรุณาเลือกตัวชี้วัด' },
      budget: { required: '*กรุณาระบุงบประมาณ', pattern: '*กรุณาระบุเป็นตัวเลขเท่านั้น' },
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

}
