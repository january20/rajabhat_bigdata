import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { ExpertService } from '../shared/expert.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('avatarUploader', { static: false }) avatarInput;

  title = this.route.snapshot.data['title'];
  form: FormGroup;
  formType: 'CREATE' | 'EDIT' = this.route.snapshot.data['formType'];
  prefixes: Array<Object>;
  expertises: Array<Object>;
  expertTypes: Array<Object>;
  lat: number = 14.882564;
  lng: number = 103.494215;
  img_path: string
  images: Array<Object>;
  documents: Array<Object>;
  isSubmit = false;
  removeImagesAll = false;
  removeDocumentsAll = false;
  previewAvatar;
  formReady = false;
  formErrors = {
    avatar: '',
    firstname: '',
    lastname: '',
    expertise_name: '',
    expertise_description: '',
    tel: ''
  };
  validationMessages = {
    avatar: {
      required: '*กรุณาเลือกรูปภาพ'
    },
    firstname: {
      required: '*กรุณาระบุชื่อ'
    },
    lastname: {
      required: '*กรุณาระบุนามสกุล'
    },
    expertise_name: {
      required: '*กรุณาระบุความเชี่ยวชาญ'
    },
    expertise_description: {
      required: '*กรุณาระบุรายละเอียดความเชี่ยวชาญ'
    },
    tel: {
      pattern: '*หมายเลขโทรศัพท์ไม่ถูกต้อง'
    }
  }

  constructor(
    private expertService: ExpertService,
    private formBuilder: FormBuilder,
    private renderer: Renderer,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
    this.buildForm();
    this.loadEditData();
    this.subscribeToFormChanged();
  }

  submit() {
    this.isSubmit = true;

    if(this.formType == 'CREATE') {
      this.expertService.store(this.form.value).subscribe(
        res => {
          this.snackBar.open('บันทึกข้อมูลสำเร็จ', '', {
            horizontalPosition: 'right',
            duration: 2000,
            panelClass: ['color-white', 'bg-success']
          });
  
          setTimeout(() => {
            this.isSubmit = false;
            this.router.navigateByUrl('/experts');
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
        this.expertService.update(this.form.value, this.route.snapshot.params.id).subscribe(
          res => {
            this.snackBar.open('แก้ไขข้อมูลสำเร็จ', '', {
              horizontalPosition: 'right',
              duration: 2000,
              panelClass: ['color-white', 'bg-success']
            });
    
            setTimeout(() => {
              this.isSubmit = false;
              this.router.navigateByUrl('/experts/'+res);
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
      });
    }
  }

  loadData() {
    this.expertService.create().subscribe((data: any) => {
      this.prefixes = data.prefixes;
      this.expertises = data.expertises;
      this.expertTypes = data.expert_types;
      this.formReady = true;
    })
  }

  loadEditData() {
    if(this.formType === 'CREATE') return;

    this.expertService.edit(this.route.snapshot.params.id).subscribe((data: any) => {
      
      this.form.get('prefix').setValue(data.sys_user.prefix_id);
      this.form.get('firstname').setValue(data.sys_user.firstname);
      this.form.get('lastname').setValue(data.sys_user.lastname);
      this.form.get('lat').setValue(data.sys_user.lat);
      this.form.get('lng').setValue(data.sys_user.lng);
      this.form.get('tel').setValue(data.sys_user.tel);
      this.form.get('email').setValue(data.sys_user.email);
      this.form.get('expertise_name').setValue(data.title);
      this.form.get('expertise_description').setValue(data.description);
      this.form.get('expertise').setValue(data.expertise_id);
      this.form.get('expert_type').setValue(data.expert_type);

      this.img_path = data.img_path;
      this.images = data.images;
      this.documents = data.files;
      this.previewAvatar = data.sys_user.profile_image ? '/app/images/users/avatar/'+data.sys_user.profile_image : null;
      
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

  triggerAvatarUpload(event) {
    event.preventDefault();
    
    this.renderer.invokeElementMethod(
      this.avatarInput.nativeElement,
      'dispatchEvent',
      [ new MouseEvent('click', { bubbles: true }) ]
    );
  }

  addAvatar(event) {
    const reader = new FileReader();
    const image = event.target.files[0];

    reader.onload = () => {
      const content = reader.result;
      this.previewAvatar = content;
      this.avatar.get('filename').patchValue(image.name);
      this.avatar.get('mimeType').patchValue(image.type);
      this.avatar.get('base64').patchValue(content);
    }

    reader.readAsDataURL(image);
  }

  async addDeleted() {
    this.clearFormArray(this.deleted_files);
    this.clearFormArray(this.deleted_images);
    
    if(this.documents) {
      this.documents.map((file: any) => {
        if(file.status === 0) this.deleted_files.push(this.formBuilder.group(file));
      });
    }
    
    if(this.images) {
      this.images.map((image: any) => {
        if(image.status === 0) this.deleted_images.push(this.formBuilder.group(image));
      });
    }

  }

  manageImages(status) {
    this.images.map((image: any) => image.status = status);
    this.removeImagesAll = status === 0 ? true : false;
    if(status === 1) this.clearFormArray(this.deleted_images);
  }

  manageDocuments(status) {
    this.documents.map((file: any) => file.status = status);
    this.removeDocumentsAll = status === 0 ? true : false;
    if(status === 1) this.clearFormArray(this.deleted_files);
  }

  changePosition(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.form.patchValue({
      lat: event.coords.lat,
      lng: event.coords.lng
    });
  }  

  buildForm() {
    this.form = this.formBuilder.group({
      expert_type: ['', Validators.required],
      expertise: ['', Validators.required],
      avatar: this.formBuilder.group({
        filename: [''],
        mimeType: [''],
        base64: ['']
      }),
      prefix: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [''],
      tel: ['', Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')],
      expertise_name: ['', Validators.required],
      expertise_description: ['', Validators.required],
      files: this.formBuilder.array([]),
      lat: [''],
      lng: [''],
      deleted_files: this.formBuilder.array([]),
      deleted_images: this.formBuilder.array([])
    });
  }

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

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  get files() { return this.form.get('files') as FormArray; }
  get avatar() { return this.form.get('avatar') as FormArray; }
  get deleted_files() { return this.form.get('deleted_files') as FormArray; }
  get deleted_images() { return this.form.get('deleted_images') as FormArray; }

}
