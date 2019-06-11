import { Component, OnInit } from '@angular/core';
import { KpiService } from './shared/kpi.service';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {

  srru_kpis:any;

  kpi_year:Number = 2018;

  constructor(private kpi:KpiService) { }

  ngOnInit() {
    this.kpi.srru_strategies(2018).subscribe(data=>{
      console.log(data);
      this.srru_kpis = data;
   });


  }

}
