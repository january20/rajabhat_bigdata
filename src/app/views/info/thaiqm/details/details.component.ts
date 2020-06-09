import { Component, OnInit, NgZone} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from '../../shared/info.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  data:any;
  effect_summary:any;
  need_summary:any;
  village:any;
  avg_income_day:any;
  avg_income_month:any;
  male:any;
  female:any;

  constructor(
    private route: ActivatedRoute,
    private info: InfoService,
    private zone: NgZone
  ) { }

  ngOnInit() {

    console.log(this.route.snapshot.params.id);

    this.info.villageInfo( this.route.snapshot.params.id ).subscribe((data:any)=>{
      this.data=data.data;
      this.effect_summary=data.effect_summary;
      this.need_summary=data.need_summary;
      this.village=data.village;
      this.avg_income_day = data.avg_income_day;
      this.avg_income_month = data.avg_income_month;
      this.male = data.male;
      this.female = data.female;

      console.log(this.data);

      this.createChart(this.effect_summary,'effectChart','effect','count');
      this.createChart(this.need_summary,'needChart','need','count');

    });

  }
  createChart(data,chartId,xField,yField) {
    this.zone.runOutsideAngular(() => {

      let chart = am4core.create(chartId, am4charts.PieChart);
      chart.data = data;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = yField;
      pieSeries.dataFields.category = xField;
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;



  });
}



}
