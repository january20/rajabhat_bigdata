import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamiliesService } from '../shared/families.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  member: any;

  constructor(
    private route: ActivatedRoute,
    private familiesService: FamiliesService
  ) { }

  ngOnInit() {
    this.familiesService.get(this.route.snapshot.params.id, this.route.snapshot.params.role).subscribe((data: any) => this.member = data);
  }

}
