import { Component, OnInit } from '@angular/core';
import { ExpertService } from '../shared/expert.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  expert: Object;

  constructor(
    private expertService: ExpertService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.expertService.get(this.route.snapshot.params.id).subscribe((data: any) => this.expert = data);
  }

  convertFloat(val): number {
    return parseFloat(val);
  }

}
