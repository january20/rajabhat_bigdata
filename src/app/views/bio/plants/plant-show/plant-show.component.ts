import { Component, OnInit } from '@angular/core';
import { BioService } from '../../shared/bio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-show',
  templateUrl: './plant-show.component.html',
  styleUrls: ['./plant-show.component.scss']
})
export class PlantShowComponent implements OnInit {

  plant: any;

  constructor(
    private bioService: BioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.bioService.getPlant(this.route.snapshot.params.id).subscribe(data => this.plant = data);
  }

}
