import { Component, OnInit } from '@angular/core';
import { ExpertService } from '../shared/expert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  prefixes: Array<Object>;
  expertises: Array<Object>;
  expertTypes: Array<Object>;
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadData();
    this.buildForm();
  }

  loadData() {
    this.expertService.createExpert().subscribe((data: any) => {
      this.prefixes = data.prefixes;
      this.expertises = data.expertises;
      this.expertTypes = data.expert_types;
      this.formReady = true;
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      expert_type: ['', Validators.required],
      expertise: ['', Validators.required],
      avatar: ['', Validators.required],
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

}
