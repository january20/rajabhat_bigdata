import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BioService } from '../../shared/bio.service';

@Component({
  selector: 'app-animal-show',
  templateUrl: './animal-show.component.html',
  styleUrls: ['./animal-show.component.scss']
})
export class AnimalShowComponent implements OnInit {

  animal: any;

  constructor(
    private route: ActivatedRoute,
    private bioService: BioService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.bioService.getAnimal(this.route.snapshot.params.id).subscribe(data => this.animal = data);
  }
}
