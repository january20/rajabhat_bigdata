import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReferenceService } from 'src/app/shared/services/reference.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss']
})
export class UserRegisterFormComponent implements OnInit {

  form: FormGroup;
  districts = [];
  sub_districts = [];
  villages = [];
  isSubmit = false;
  createSuccess = false;
  successUsername: string;
  successPassword: string;

  constructor(
    private formBuilder: FormBuilder,
    private refService: ReferenceService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadData();
  }

  submit() {
    this.authService.ext_register(this.form.value).subscribe(
      (res: any) => {
        this.snackBar.open('บันทึกข้อมูลสำเร็จ', '', {
          horizontalPosition: 'right',
          duration: 2000,
          panelClass: ['color-white', 'bg-success']
        });

        setTimeout(() => {
          this.isSubmit = false;
          this.createSuccess = true;
          this.successUsername = res.username;
          this.successPassword = res.password;
        }, 2000);          
      },
      err => {
        this.snackBar.open('หมู่บ้านนี้ได้ทำการสร้างชื่อผู้ใช้ไปแล้ว', '', {
          horizontalPosition: 'right',
          duration: 2000,
          panelClass: ['color-white', 'bg-danger']
        });
        this.isSubmit = false;
      }
    );
  }

  loadData() {
    this.refService.districts().subscribe((data: any) => this.districts = data);
  }

  loadSubDistricts(event) {
    this.refService.sub_districts(event.value).subscribe((data: any) => this.sub_districts = data);
  }

  loadVillages(event) {
    this.refService.villages(event.value).subscribe((data: any) => this.villages = data);
  }

  toDashboard() {
    this.router.navigate(['/dashboard']);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      village_id: ['', Validators.required]
    });
  }

}
