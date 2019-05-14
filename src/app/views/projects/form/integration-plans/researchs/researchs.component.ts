import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-researchs',
  templateUrl: './researchs.component.html',
  styleUrls: ['./researchs.component.scss']
})
export class ResearchsComponent implements OnInit {

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
