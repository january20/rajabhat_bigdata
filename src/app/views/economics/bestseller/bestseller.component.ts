import { Component, OnInit } from '@angular/core';
import { EconomicsService } from '../shared/economics.service';

@Component({
  selector: 'app-bestseller',
  templateUrl: './bestseller.component.html',
  styleUrls: ['./bestseller.component.scss']
})
export class BestsellerComponent implements OnInit {

  constructor(
    private economics: EconomicsService
  ) { }

  products:any[] = [];
  iii:number=1;

  ngOnInit() {
    this.loadBestSeller();
  }
  loadBestSeller(){
    this.economics.loadBestSeller().subscribe((data:any)=>{
      this.products = data;
      console.log(data);
    }, err=>{
      console.log(err);
    });
  }

}
