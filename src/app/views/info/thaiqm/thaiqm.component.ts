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


  lat = 14.882564;
  lng = 103.494215;

  qmp1:any;
  qmp3:any;
  thqmp4:any;
  districts:any;
  default_acode:any;
  ready = false;

  constructor(
    private _info: InfoService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.loadThaiQmSummary();
  }

  changeDistrict(district){
    console.log(district);
    this.default_acode = district.acode;
    this.ready = false;
    this._info.loadThaiQmPx(4, district.acode).subscribe((data:any)=>{
      this.default_acode = data.default_acode;
      this.thqmp4 = data.data;
      this.districts = data.districts;
      this.ready = true;
    });


  }
  loadThaiQmSummary(){

      this._info.loadThaiQmPx(1).subscribe((data:any)=>{
        //console.log(data);
        this.qmp1 = data;
      });
      this._info.loadThaiQmPx(2).subscribe((data:any)=>{
        //console.log(data);
        this.createChart(data.effects,'effectChart','effect','count','จำนวน (คน)',"ผลกระทบ");
      });
      this._info.loadThaiQmPx(3).subscribe((data:any)=>{
        //console.log(data);
        this.qmp3 = data.needs;
      });
      this._info.loadThaiQmPx(4).subscribe((data:any)=>{
        this.default_acode = data.default_acode;
        this.thqmp4 = data.data;
        this.districts = data.districts;
        this.ready = true;
      });
  }

  markerMouseOver(infoWindow, map) {

    try{
      if (map.lastOpen != null) {
        map.lastOpen.close();
      }


      map.lastOpen = infoWindow;
      infoWindow.open();

    }catch(e){
      map.lastOpen = null;
      console.log("Error=>",e);
    }
    
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
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.title.text = ylabel;
      valueAxis.title.text = xlabel;
      // categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      //   if (target.dataItem && target.dataItem.index & 2 == 2) {
      //     return dy + 25;
      //   }
      //   return dy;
      // });
      



      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = yField;
      series.dataFields.categoryX  = xField;
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.cornerRadiusTopLeft = 10;
      // series.strokeWidth = 2;
      // series.fillOpacity = 0.5;
      series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      // series.tooltipText = "{valueY}[/]";
      // series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";



    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    chart.zoomOutButton.disabled = true;


  });
}

}
