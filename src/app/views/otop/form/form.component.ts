import { Component, OnInit } from '@angular/core';
import { OtopService } from '../shared/otop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { map, startWith, debounceTime, switchMap, catchError, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  title = this.route.snapshot.data['title'];
  formType: 'CREATE' | 'EDIT' = this.route.snapshot.data['formType'];
  form: FormGroup;
  categories: any;
  subDistricts: Observable<any> = null;
  isSubmit = false;
  img_path: string;
  images = [];
  removeImagesAll = false;
  formErrors = {sub_district: '', category: '', name: '', description: '', price: ''};
  validationMessages = {
    sub_district: {
      required: 'กรุณาระบุตำบล'
    },
    category: {
      required: 'กรุณาเลือกประเภทผลิตภัณฑ์'
    },
    name: {
      required: 'กรุณาระบุชื่อผลิตภัณฑ์'
    },
    description: {
      required: 'กรุณาระบุชื่อผลิตภัณฑ์'
    },
    price: {
      required: 'กรุณาระบุราคา',
      pattern: 'กรุณาระบุเป็นตัวเลขเท่านั้น'
    }
  }

  constructor(
    private otopService: OtopService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.buildForm();
    this.loadData();
    this.subscribeToFormChanged();

    this.subDistricts = this.form.get('sub_district').valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (value !== '') {
          return this.lookup(value);
        } else {
          return of(null);
        }
      })
    );
  }

  submit() {
    this.isSubmit = true;

    if(this.formType == 'CREATE') {
      this.otopService.store(this.form.value).subscribe(
        res => {
          this.snackBar.open('บันทึกข้อมูลสำเร็จ', '', {
            horizontalPosition: 'right',
            duration: 2000,
            panelClass: ['color-white', 'bg-success']
          });
  
          setTimeout(() => {
            this.isSubmit = false;
            this.router.navigateByUrl('/otop');
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
        this.otopService.update(this.route.snapshot.params.id, this.form.value).subscribe(
          res => {
            this.snackBar.open('แก้ไขข้อมูลสำเร็จ', '', {
              horizontalPosition: 'right',
              duration: 2000,
              panelClass: ['color-white', 'bg-success']
            });
    
            setTimeout(() => {
              this.isSubmit = false;
              this.router.navigateByUrl('/otop/'+res);
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
      })
    }
  }

  async addDeleted() {
    this.clearFormArray(this.deleted_images);
    
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

  addFiles(files: File[]) {
    this.pictures.controls = [];
    files.forEach((file, index) => {
      const reader = new FileReader();
   
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        this.pictures.push(this.formBuilder.group({
          filename: [file.name],
          mimeType: [file.type],
          base64: [content]
        }))
      };

      reader.readAsDataURL(file);
    });
  }

  lookup(value: string): Observable<any> {
    return this.otopService.searchSubDistricts(value).pipe(
      map(results => results),
      catchError(_ => {
        return of(null);
      })
    );
  }

  displaySubDistrict(sub_district) {
    if(sub_district) return `ตำบล${sub_district.sub_district_name_th} อำเภอ${sub_district.district.district_name_th} จังหวัด${sub_district.province.province_name_th}`;    
  }

  loadData() {
    if(this.formType === 'CREATE') return;

    this.otopService.edit(this.route.snapshot.params.id).subscribe((data: any) => {
      
      this.form.get('name').setValue(data.name);
      this.form.get('description').setValue(data.description);
      this.form.get('price').setValue(data.price);
      this.form.get('category').setValue(data.category_id);
      this.form.get('sub_district').setValue(data.sub_district);
      this.form.get('note').setValue(data.note);

      this.img_path = data.images;
      this.images = data.pictures;
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      sub_district: ['', Validators.required],
      category: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
      ])],
      note: [''],
      pictures: this.formBuilder.array([]),
      deleted_images: this.formBuilder.array([])
    });
  }

  loadCategories() {
    this.otopService.categories().subscribe(data => this.categories = data);
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

  get pictures() { return this.form.get('pictures') as FormArray; }
  get deleted_images() { return this.form.get('deleted_images') as FormArray; }

}
