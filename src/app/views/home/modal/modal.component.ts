import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomeService } from '../shared/home.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  village: any = null;
  private chart: am4charts.PieChart;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    private homeService: HomeService,
    private zone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async ngOnInit() {
    this.homeService.getVillage(this.data.id).subscribe((data: any) => {
      this.village = data;
      this.createChart(data.population);
    })
  }

  createChart(population: any) {
    this.zone.runOutsideAngular(() => {
      population.forEach(pop => {
        let chart = am4core.create(`${pop.name_en}Chart`, am4charts.PieChart);

        chart.data = pop.data.map(d => {
          return { "type": d.name_th, "population": d.population }
        })
  
        let series = chart.series.push(new am4charts.PieSeries());
        
        series.dataFields.value = "population";
        series.dataFields.category = "type";
  
        this.chart = chart;
      });
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
