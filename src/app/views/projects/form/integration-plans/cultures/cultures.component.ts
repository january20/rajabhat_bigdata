import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrls: ['./cultures.component.scss']
})
export class CulturesComponent implements OnInit {

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
