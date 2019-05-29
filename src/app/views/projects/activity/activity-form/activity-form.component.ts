import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  title = this.route.snapshot.data['title'];
  formType: 'CREATE' | 'EDIT' = this.route.snapshot.data['formType'];
  project: any;
  form: FormGroup;
  images: Array<Object>;
  documents: Array<Object>;
  formErrors = this.createFormErrors();
  validationMessages = this.createValidationMessages();
  isSubmit = false;
  formReady = false;
  removeImagesAll = false;
  removeDocumentsAll = false;

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
    this.loadEditData();
    this.subscribeToFormChanged();
  }

  submit() {
    this.isSubmit = true;

    if(this.formType == 'CREATE') {
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
    } else {
      this.addDeleted().then(() => {
        console.log(this.form.value);
        this.isSubmit = false;
      })
    }

  }

  loadData() {
    this.projectService.getCreateActivity(this.route.snapshot.params.id).subscribe((data: any) => {
      this.project = data;
      if(this.formType === 'CREATE') this.formReady = true;
    });
  }

  loadEditData() {
    if(this.formType === 'CREATE') return;

    this.projectService.getEditActivity(this.route.snapshot.params.activity_id).subscribe((data: any) => {
      this.form.get('name').setValue(data.name);
      this.form.get('description').setValue(data.description);
      this.form.get('objective').setValue(data.objective_id);
      this.form.get('objective_note').setValue(data.objective_note);
      this.form.get('kpi').setValue(data.kpi_id);
      this.form.get('kpi_note').setValue(data.kpi_note);
      this.form.get('budget').setValue(data.budget);
      this.form.get('created_at').setValue(new Date(data.created_at));

      this.images = data.images;
      this.documents = data.files;
      
      this.formReady = true;
    });
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

  async addDeleted() {
    this.deleted_files.controls = [];
    this.deleted_images.controls = [];
    
    this.documents.map((file: any) => {
      if(file.status === 0) this.deleted_files.push(this.formBuilder.group(file));
    });
    this.images.map((image: any) => {
      if(image.status === 0) this.deleted_images.push(this.formBuilder.group(image));
    });
  }

  manageImages(status) {
    this.images.map((image: any) => image.status = status);
    this.removeImagesAll = status === 0 ? true : false;
  }

  manageDocuments(status) {
    this.documents.map((file: any) => file.status = status);
    this.removeDocumentsAll = status === 0 ? true : false;
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
      files: this.formBuilder.array([]),
      created_at: ['', Validators.required],
      deleted_files: this.formBuilder.array([]),
      deleted_images: this.formBuilder.array([])
    });
  }

  get files() { return this.form.get('files') as FormArray; }
  get deleted_files() { return this.form.get('deleted_files') as FormArray; }
  get deleted_images() { return this.form.get('deleted_images') as FormArray; }

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
