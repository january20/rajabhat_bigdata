import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  @Input() benefits: FormArray;
  
  benefitObj = [
    { id: 1, name: 'ด้านเศรษฐกิจ' },
    { id: 2, name: 'ด้านสังคม' },
    { id: 3, name: 'ด้านสิ่งแวดล้อม' },
    { id: 4, name: 'ด้านการศึกษา/เรียนรู้ตลอดชีวิต' },
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addBenefits();
  }

  createBenefit(id): FormGroup {
    return this.formBuilder.group({
      status: [false],
      id: [id],
      benefit: ['']
    });
  }

  addBenefits() {
    this.benefitObj.map((item) => {
      // const control = new FormControl(false);
      this.benefits.push(this.createBenefit(item.id));
    });
  }

}
