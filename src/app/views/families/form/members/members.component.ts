import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnChanges {

  @Input() formType: 'CREATE' | 'EDIT';
  @Input() members: FormArray;
  @Input() prefixes;
  @Input() genders;
  @Input() occupations;
  @Input() educations;
  @Input() editMembers: Array<Object>;
  @Output() memberRemoved = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.formType === 'CREATE') return;

    const members: SimpleChange = changes.editMembers;

    if(members) {
      this.addEditMembers(members.currentValue);
    }    
  }

  createMember(members?: any): FormGroup {
    return this.formBuilder.group({
      id: [members ? members.id : ''],
      gender: [members ? members.gender_id : '', Validators.required],
      prefix: [members ? members.prefix_id : '', Validators.required],
      firstname: [members ? members.firstname : '', Validators.required],
      lastname: [members ? members.lastname : '', Validators.required],
      occupation: [members ? members.occupation_id : '', Validators.required],
      education: [members ? members.education_id : '', Validators.required],
      monthly_income: [members ? members.monthly_income : null, Validators.compose([
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
      ])],
      born: [members ? members.born : '', Validators.required],
      email: [members ? members.email : '', Validators.email],
      tel: [members ? members.tel : '', Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,2})?$")],
    });
  }

  addMember(event) {
    event.preventDefault();

    this.members.push(this.createMember());
  }

  removeMember(index, id) {
    this.memberRemoved.emit({ index: index, id: id });
  }

  addEditMembers(members) {
    if(!members) return;
    
    members.map(member => {
      this.members.push(this.createMember(member));
    });
  }

}
