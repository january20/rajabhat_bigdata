import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  @Input('plan') form;
  @Input() index; 
  @Input() name;

  toggle = false;

  constructor() {

  }

  ngOnInit() {
    // this.subscribeToFormChanged();
  }

  togglePlan() {
    this.toggle = !this.toggle;
  }

}
