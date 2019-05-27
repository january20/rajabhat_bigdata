import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { BioService } from '../../shared/bio.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.scss']
})
export class PlantFormComponent implements OnInit {

  form: FormGroup;
  plantOrgans;
  isSubmit = false;
  lat: number = 14.882564;
  lng: number = 103.494215;
  formErrors = { name: '', organ: '' };
  validationMessages = {
    name: {
      required: 'กรุณาระบุชื่อพืช'
    },
    organ: {
      required: 'กรุณาเลือกส่วนของพืช'
    }
  };

  constructor(
    private bioService: BioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.loadData();
    this.buildForm();
    this.getCurrentPosition();
    this.subscribeToFormChanged();
  }

  submit() {
    this.isSubmit = true;

    this.bioService.storeBio(this.form.value, 1).subscribe(
      res => {
        this.snackBar.open('บันทึกข้อมูลสำเร็จ', '', {
          horizontalPosition: 'right',
          duration: 2000,
          panelClass: ['color-white', 'bg-success']
        });

        setTimeout(() => {
          this.isSubmit = false;
          this.router.navigateByUrl('/bio');
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

  addFiles(files: File[]) {
    this.images.controls = [];
    files.forEach((file, index) => {
      const reader = new FileReader();
   
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        this.images.push(this.formBuilder.group({
          filename: [file.name],
          mimeType: [file.type],
          base64: [content]
        }))
      };

      reader.readAsDataURL(file);
    });
  }

  loadData() {
    this.bioService.getPlantOrgans().subscribe(data => this.plantOrgans = data);
  }

  getCurrentPosition() {
    if(navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
      })
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
      name: ['', Validators.required],
      lat: [this.lat],
      lng: [this.lng],
      organ: ['', Validators.required],
      informant: [''],
      images: this.formBuilder.array([], Validators.required)
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

  get images() { return this.form.get('images') as FormArray; }

}
