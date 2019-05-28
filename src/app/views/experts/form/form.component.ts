import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { ExpertService } from '../shared/expert.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('avatarUploader') avatarInput;

  form: FormGroup;
  prefixes: Array<Object>;
  expertises: Array<Object>;
  expertTypes: Array<Object>;
  lat: number = 14.882564;
  lng: number = 103.494215;
  formReady = false;
  formErrors = {
    avatar: '',
    firstname: '',
    lastname: '',
    expertise_name: '',
    expertise_description: '',
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
  }

  constructor(
    private expertService: ExpertService,
    private formBuilder: FormBuilder,
    private renderer: Renderer,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.loadData();
    this.buildForm();
    this.subscribeToFormChanged();
  }

  loadData() {
    this.expertService.createExpert().subscribe((data: any) => {
      this.prefixes = data.prefixes;
      this.expertises = data.expertises;
      this.expertTypes = data.expert_types;
      this.formReady = true;
    })
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

  triggerAvatarUpload() {
    this.renderer.invokeElementMethod(
      this.avatarInput.nativeElement,
      'dispatchEvent',
      [ new MouseEvent('clic', { bubbles: true }) ]
    );
  }

  addAvatar(event) {
    const reader = new FileReader();
    const image = event.target.files[0];

    reader.onload = () => {
      const content = reader.result;

      // this.avatar.setValue({
      //   filename: 
      // })
    }
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
      tel: [''],
      expertise_name: ['', Validators.required],
      expertise_description: ['', Validators.required],
      files: this.formBuilder.array([]),
      lat: [''],
      lng: ['']
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

  get files() { return this.form.get('files') as FormArray; }
  get avatar() { return this.form.get('avatar') as FormArray; }

}
