import { Component, OnInit, NgZone } from '@angular/core';
import { EconomicsService } from '../shared/economics.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {

  volume:any = {};

  constructor(
    private zone: NgZone,
    private economics: EconomicsService
  ) { }

  ngOnInit() {

    this.loadVolume();
  }
  loadVolume(){
    this.economics.loadVolume().subscribe((data:any)=>{

      this.volume.daily = data.daily;
      this.volume.weekly = data.weekly;
      this.volume.monthly = data.monthly;
      this.volume.yearly = data.yearly;
      this.volume.total = data.total;


      if(data.trn_daily.length>0) this.createChart(data.trn_daily,'trn_daily','xField','price','ปริมาณซื้อขาย(บาท)','เวลาที่ขายได้วันนี้');
      if(data.trn_weekly.length>0) this.createChart(data.trn_weekly,'trn_weekly','xField','price','ปริมาณซื้อขาย(บาท)','การขายรายชั่วโมงในสัปดาห์นี้');
      if(data.trn_monthly.length>0) this.createChart(data.trn_monthly,'trn_monthly','xField','price','ปริมาณซื้อขาย(บาท)','การขายรายวันในเดือนนี้');
      if(data.trn_yearly.length>0) this.createChart(data.trn_yearly,'trn_yearly','xField','price','ปริมาณซื้อขาย(บาท)','การขายรายเดือนในปีนี้');

    }, err=>{
      console.log('err',err);
    });
  }

  createChart(data,chartId,xField,yField,verticalLegend,horizontalLegend) {

      this.zone.runOutsideAngular(() => {

        let chart = am4core.create(chartId, am4charts.XYChart);
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        chart.colors.step = 2;
        chart.data = data;
        chart.cursor = new am4charts.XYCursor();

        categoryAxis.dataFields.category = xField;
        categoryAxis.renderer.minGridDistance = 50;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.title.text = horizontalLegend;

        valueAxis.title.text = verticalLegend;//this.field.iot_type_name_th+"("+this.field.unit+")";

        //let series = chart.series.push(new am4charts.LineSeries());
        var series = chart.series.push(new am4charts.ColumnSeries());

        series.dataFields.valueY = yField;
        series.dataFields.categoryX  = xField;
        series.strokeWidth = 2;
      //  series.tensionX = 0.77;
        series.fillOpacity = 0.5;
        series.tooltipText = "{valueY}[/]";

    });
  }

}
