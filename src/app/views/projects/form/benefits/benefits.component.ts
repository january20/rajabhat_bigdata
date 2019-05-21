import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() benefits: FormArray;
  @Input() editBenefits: Array<Object>;
  
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

  ngOnChanges(changes: SimpleChanges) {
    let benefits: SimpleChange = changes['editBenefits'];    
    let benefitsCurr = benefits ? benefits.currentValue : null;
    
    if(this.formType === 'EDIT') {
      this.addEditBenefits(benefitsCurr);    
    }

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

  addEditBenefits(benefits) {
    if(benefits && benefits.length > 0) {

      benefits.map(benefit => {
        this.benefits.controls[benefit.benefit_type - 1].patchValue({
          status: true,
          id: benefit.benefit_type,
          benefit: benefit.benefit
        });
      });
    }
  }

}
