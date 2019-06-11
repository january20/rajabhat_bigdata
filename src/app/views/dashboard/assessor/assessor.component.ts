import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assessor',
  templateUrl: './assessor.component.html',
  styleUrls: ['./assessor.component.scss']
})
export class AssessorComponent implements OnInit {

  @Input() myEvaluationList;
  @Input() currentUser;

  constructor() { }

  ngOnInit() {
  }

}
