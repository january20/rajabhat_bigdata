import { Component, OnInit } from '@angular/core';
import { BioService } from '../shared/bio.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  animals: Array<Object>;
  plants: Array<Object>;
  lat = 14.882564;
  lng = 103.494215;

  constructor(
    private bioService: BioService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.bioService.getBio().subscribe((data: any) => {
      this.animals = data.animals;
      this.plants = data.plants;
    });
  }

}
