import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  @Input() benefits: FormArray;
  
  benefitObj = [
    { name: 'ด้านเศรษฐกิจ' },
    { name: 'ด้านสังคม' },
    { name: 'ด้านสิ่งแวดล้อม' },
    { name: 'ด้านการศึกษา/เรียนรู้ตลอดชีวิต' },
  ]

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.addBenefits();
  }

  createBenefit(): FormGroup {
    return this.formBuilder.group({
      status: [false],
      benefit: ['', Validators.required]
    });
  }

  addBenefits() {
    this.benefitObj.map((o, i) => {
      // const control = new FormControl(false);
      this.benefits.push(this.createBenefit());
    });
  }

}
