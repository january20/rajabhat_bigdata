import { Component, OnInit, NgZone} from '@angular/core';
import { DevplansService } from './shared/devplans.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-devplans',
  templateUrl: './devplans.component.html',
  styleUrls: ['./devplans.component.scss']
})
export class DevplansComponent implements OnInit {


  plans:any;
  total:number = 0;
  topics:any[] = [];
  default_topic:any; 
  cols:any[] = [];
  terminate = true;

  districts:any[] = [];
  sub_districts:any[] = [];
  villages:any[] = [];

  default_district_id = null;
  default_sub_district_id = null;


  loaded=false;
  chart:any;
  data:any[] = [];


  constructor(
    private plan:DevplansService,
    private zone: NgZone
  ) { }

  ngOnInit() {

    // for(var i=1;i<=74;i++){
    //   if(i<10){
    //     this.topics.push({
    //       que_id: `que_00${i}`
    //     });
    //   }else{
    //     this.topics.push({
    //       que_id: `que_0${i}`
    //     });
    //   }
    // }
    
    this.loadTopics();
    
  }
  
  ngAfterViewInit(){
    //this.loadLocations();
  }
  
  changeTopics(event){
    console.log(event);
    this.default_topic = this.topics.find(el=>el.que_id == event);
    this.changeArea(0,1);
  }

  loadTopics(){
    this.plan.getTopics().subscribe((data:any)=>{
      this.topics = data;
      if(data.length > 0){
        this.default_topic = data[0];
        this.changeArea(0,1);
      }
    }, err=>{

    });

  }
  changeArea(e,i){
    console.log(e,i);
    this.loaded = false;
    if(i==1){
      this.sub_districts = [];
      this.villages = [];
      this.default_sub_district_id = null;
     // console.log("Before=>",e,this.sub_districts);
      if(e!=0){
        this.default_district_id = e;
        this.loadLocations(e,null,null);
      }else{
        this.default_district_id = null;
        this.loadLocations();
      }

    }else if(i==2){
      this.villages = [];
      this.default_sub_district_id = e;
      this.loadLocations(null,e,null);
    }else if(i==3){
      //load single village 

      this.loadPlans(null,null,e);

    }

  }
  loadLocations(district_id=null,sub_district_id=null,village_id=null){
    //console.log("Select=>",district_id,sub_district_id,village_id);
    this.plan.getLocation(district_id,sub_district_id,village_id).subscribe((data:any)=>{
      console.log(data);
      if(data.districts)this.districts = data.districts;
      if(data.sub_districts)this.sub_districts = data.sub_districts;
      if(data.villages)this.villages = data.villages;

      console.log("loadPlan=>",district_id,sub_district_id,village_id, this.default_district_id, this.default_sub_district_id);
      this.loadPlans(district_id,sub_district_id,village_id);
    });
  }
  loadPlans(district_id,sub_district_id,village_id){
    
    this.plan.loadDevPlans(this.default_topic.que_id,district_id,sub_district_id,village_id).subscribe((data:any)=>{
      console.log(data);
      this.loaded = true;
      this.total = data.total;
      this.createChart(data.data,"que_id",data.cols,data.topic.unit);
      // var tmp = data.topics;
      // for(var i=0;i<tmp.length;i++){
      //   var topic = this.topics.find(e=>e.que_id == tmp[i].que_id);
      //   topic.unit = tmp[i].unit;
      //   topic.topic_th = tmp[i].topic_th;
      //   topic.data = tmp[i].data;
      // }
      // //console.log("start .....");
      // this.terminate = false;
      // this.createNextChart(0);
    }, err=>{

    });
  }

  createNextChart(i){
    if(i>=74 && !this.terminate) return;
    this.loaded = true;
    //console.log(this.topics[i]);
    //this.createChart(i,this.topics[i].data,"que_id",this.getVariancePercent);

    // setTimeout(() => {
    //   var nx = i + 1;
    //   this.createNextChart(nx);
    // }, 200);
  
   
  }

  createChart(data,chartId,cols,unit) {
    this.zone.runOutsideAngular(() => {

     if(this.chart){
       console.log(".");
       this.chart.dispose();
     }


    this.chart = am4core.create(chartId, am4charts.XYChart)
    //this.chart.colors.step = 2;
    this.chart.data =data;
    
    this.chart.legend = new am4charts.Legend()
    this.chart.legend.position = 'top'
    this.chart.legend.paddingBottom = 20
    this.chart.legend.labels.template.maxWidth = 95
    
    let xAxis = this.chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'xField'
    // xAxis.renderer.cellStartLocation = 0.1
    // xAxis.renderer.cellEndLocation = 0.9
    // xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.minGridDistance = 20;
    xAxis.renderer.labels.template.rotation = 270;

    

    let yAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    //yAxis.min = 0;
    //yAxis.rotation = 90;
    yAxis.title.text = unit;
    yAxis.tooltip.disabled = false;


    
    this.chart.cursor = new am4charts.XYCursor();

    cols.forEach(el=>{
      this.createSeries(el.name, el.name, this.chart);
    });
    // this.createSeries('sect1', 'มหานิกาย', this.chart);
    // this.createSeries('sect2', 'ธรรมยุต', this.chart);
    
    });
  }

  createSeries(value, name, chart) {
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = value;
    series.dataFields.categoryX = 'xField';
    series.name = name

    //series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;


    let bullet = series.bullets.push(new am4charts.LabelBullet())
    bullet.interactionsEnabled = true;
    bullet.dy = 30;
    bullet.rotation = 270;
    bullet.label.text = '{valueY}';
    bullet.label.truncate = false;
    bullet.label.hideOversized = false;
        // bullet.label.wrap = false;
    // bullet.label.maxWidth = 120;
    // bullet.label.marginBottom = 0;
    // bullet.label.marginTop = 0;

    //bullet.label.padding(4, 8, 4, 8);
    // bullet.label.background.stroke = am4core.color("#555");
    // bullet.label.background.strokeOpacity = 1;
    // bullet.label.background = new am4core.RoundedRectangle();
    // bullet.label.background.cornerRadius(5, 5, 5, 5);

    bullet.label.fill = am4core.color('#ffffff')
    return series;
  }


}
