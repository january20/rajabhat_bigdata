import { Component, OnInit, NgZone} from '@angular/core';
import { InfoService } from '../shared/info.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-thaiqm',
  templateUrl: './thaiqm.component.html',
  styleUrls: ['./thaiqm.component.scss']
})
export class ThaiqmComponent implements OnInit {

  qmp1:any;
  qmp3:any;

  constructor(
    private _info: InfoService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.loadThaiQmSummary();
  }
  loadThaiQmSummary(){

      this._info.loadThaiQmPx(1).subscribe((data:any)=>{
        console.log(data);
        this.qmp1 = data;
      });
      this._info.loadThaiQmPx(2).subscribe((data:any)=>{
        console.log(data);
        this.createChart(data.effects,'effectChart','effect','count','จำนวน (คน)',"ผลกระทบ");
      });
      this._info.loadThaiQmPx(3).subscribe((data:any)=>{
        console.log(data);
        this.qmp3 = data.needs;
      });


  }

  createChart(data,chartId,xField,yField,xlabel,ylabel) {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create(chartId, am4charts.XYChart);
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      //chart.colors.step = 2;
      chart.data = data;
      chart.cursor = new am4charts.XYCursor();
      categoryAxis.dataFields.category = xField;
      categoryAxis.renderer.minGridDistance = 50;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.title.text = ylabel;
      valueAxis.title.text = xlabel;
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = yField;
      series.dataFields.categoryX  = xField;
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.cornerRadiusTopLeft = 10;
      // series.strokeWidth = 2;
      // series.fillOpacity = 0.5;
      series.tooltipText = "{valueY}[/]";


    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    chart.zoomOutButton.disabled = true;


  });
}

}
