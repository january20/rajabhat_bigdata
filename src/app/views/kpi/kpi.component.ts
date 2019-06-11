import { Component, OnInit } from '@angular/core';
import { KpiService } from './shared/kpi.service';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {

  srru_kpis:any;

  constructor(private kpi:KpiService) { }

  ngOnInit() {
    this.kpi.srru_strategies().subscribe(data=>{
      console.log(data);
      this.srru_kpis = data;
   });


  }

}
