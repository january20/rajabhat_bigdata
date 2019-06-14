import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Input() currentUser;
  @Input() adminProjectList;
  @Input() adminExpertList;
  @Input() adminOtopList;
  @Output() projectDeleted = new EventEmitter<number>();
  @Output() expertDeleted = new EventEmitter<number>();
  @Output() otopDeleted = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  deleteProject(event) {
    this.projectDeleted.emit(event);
  }

  deleteExpert(event) {
    this.expertDeleted.emit(event);
  }

  deleteOtop(event) {
    this.otopDeleted.emit(event);
  }

}
