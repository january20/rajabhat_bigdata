import { Component, OnInit, NgZone} from '@angular/core';
import { WelfareService } from './shared/welfare.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


@Component({
  selector: 'app-welfares',
  templateUrl: './welfares.component.html',
  styleUrls: ['./welfares.component.scss']
})
export class WelfaresComponent implements OnInit {

  districts:any[] = [];
  sub_districts:any[] = [];
  ability_groups:any[] = [];
  ready = false;

  table:any[] = [];
  data:any;
  isDataLoaded = false;

  current_district_id:any;
  current_sub_district_id:any;

  constructor(
    private welfare: WelfareService,
    private zone: NgZone
  ) { }

  
  
  ngOnInit() {
    this.loadWelfareInfo();
  }
  filter(e,v){
    console.log(e,v);

    if(v === 1){

      if(e === 0){
        console.log("reset");
        this.districts = this.data.districts;
        this.table = this.data.districts;
        this.sub_districts = [];
        this.createInspectorChart(this.table,"popChart","xField","yField","จำนวน (คน)","พื้นที่");

      }else{
        this.inspectDistrict(e);
      }
     
    }else{

    }


  }
  inspectDistrict(district_id){


    this.isDataLoaded = true;
    this.welfare.welfareDistrict(district_id).subscribe((data:any)=>{
      console.log(data);
      this.table = data;
      this.isDataLoaded = false;
      this.createInspectorChart(this.table,"popChart","xField","yField","จำนวน (คน)","พื้นที่");

    }, err=>{
      console.log(err);
    });

  }
  inspectSubDistrict(sub_district_id){

  }
  loadWelfareInfo(){

    console.log("welfare ");

    this.welfare.welfareInfo().subscribe((data:any)=>{

      console.log(data);
      this.districts = data.districts;
      this.ability_groups = data.ability_groups;
      this.data = data;
      this.ready = true;
      this.table = data.districts;

      this.createChart(this.ability_groups,"welfareChart","ability_status","total","X","y");
      this.createInspectorChart(this.table,"popChart","xField","yField","จำนวน (คน)","พื้นที่");

    }, err=>{
      console.log(err);
    });

  }

  createInspectorChart(data,chartId,xField,yField,xlabel,ylabel){


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
      labelBullet.label.verticalCenter = "middle";
      labelBullet.label.dy = -10;
      labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

      chart.zoomOutButton.disabled = true;

    });

  }
  createChart(data,chartId,xField,yField,xlabel,ylabel) {
    this.zone.runOutsideAngular(() => {


      

      let container = am4core.create(chartId, am4core.Container);
      container.width = am4core.percent(100);
      container.height = am4core.percent(100);
      container.layout = "horizontal";

      let chart1 = container.createChild(am4charts.PieChart);
      chart1 .fontSize = 11;
      chart1.hiddenState.properties.opacity = 0; // this makes initial fade in effect
      chart1.data = data;
      chart1.radius = am4core.percent(70);
      chart1.innerRadius = am4core.percent(40);
      chart1.zIndex = 1;

      let title = chart1.titles.create();
      title.fontSize = 18;
      title.text = "สถานะผู้ถือบัตร";




      let series1 = chart1.series.push(new am4charts.PieSeries());
      series1.dataFields.value =yField;
      series1.dataFields.category = xField;
      series1.colors.step = 2;
      series1.alignLabels = false;
      series1.labels.template.bent = true;
      series1.labels.template.radius = 3;
      series1.labels.template.padding(0,0,0,0);
      
      let sliceTemplate1 = series1.slices.template;
      sliceTemplate1.cornerRadius = 5;
      sliceTemplate1.draggable = true;
      sliceTemplate1.inert = true;
      sliceTemplate1.propertyFields.fill = "color";
      sliceTemplate1.propertyFields.fillOpacity = "opacity";
      sliceTemplate1.propertyFields.stroke = "color";
      sliceTemplate1.propertyFields.strokeDasharray = "strokeDasharray";
      sliceTemplate1.strokeWidth = 1;
      sliceTemplate1.strokeOpacity = 1;

      chart1.legend = new am4charts.Legend();

      // let chart = am4core.create(chartId, am4charts.XYChart);
      // let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // //chart.colors.step = 2;
      // chart.data = data;
      // chart.cursor = new am4charts.XYCursor();
      // categoryAxis.dataFields.category = xField;
      // categoryAxis.renderer.minGridDistance = 50;
      // categoryAxis.renderer.grid.template.location = 0;
      // categoryAxis.renderer.labels.template.rotation = 270;
      // categoryAxis.title.text = ylabel;
      // valueAxis.title.text = xlabel;
      // let series = chart.series.push(new am4charts.ColumnSeries());
      // series.dataFields.valueY = yField;
      // series.dataFields.categoryX  = xField;
      // series.columns.template.strokeOpacity = 0;
      // series.columns.template.column.cornerRadiusTopRight = 10;
      // series.columns.template.column.cornerRadiusTopLeft = 10;
      // // series.strokeWidth = 2;
      // // series.fillOpacity = 0.5;
      // series.tooltipText = "{valueY}[/]";


      // var labelBullet = series.bullets.push(new am4charts.LabelBullet());
      // labelBullet.label.verticalCenter = "bottom";
      // labelBullet.label.dy = -10;
      // labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

      // chart.zoomOutButton.disabled = true;


   });
  }


}
