import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  result: any;
  projectReady = false;
  resultReady = false;
  isChange = false;
  currentUser;
  displayedColumns: string[] = ['status', 'project_name', 'faculty', 'budget', 'assessment_result'];
  dataSource: MatTableDataSource<any>;

  private pchart: am4charts.PieChart;
  private bchart: am4charts.XYChart;

  constructor(
    private projectService: ProjectService,
    private authService: AuthenticationService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.loadUser();
    this.loadData();
  }

  loadData() {
    this.projectService.getResult().subscribe((data: any) => {
      this.result = data;
      this.createProjectChart(data.fac_projects);
      this.createBudgetChart(data.fac_budget);

      this.resultReady = true;
    });
    this.projectService.getProjectList().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => {
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'faculty': return item.fac_id;
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.projectReady = true;
      });
    });
  }

  loadUser() {
    this.currentUser = this.authService.currentUserValue;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // changePage(page) {
  //   this.isChange = true;
  //   this.projectService.getProjectList(page).subscribe(data => {
  //     this.isChange = false;
  //     this.projects = data
  //   });
  // }

  createProjectChart(project: any) {
    this.zone.runOutsideAngular(() => {
      let projectChart = am4core.create(`projectChart`, am4charts.PieChart);

      projectChart.data = project.map(d => {
        return { "fac": d.faculty.fac_name, "project": d.total }
      })


      let projectSeries = projectChart.series.push(new am4charts.PieSeries());

      projectSeries.dataFields.value = "project";
      projectSeries.dataFields.category = "fac";

      this.pchart = projectChart;
    });
  }

  createBudgetChart(budget: any) {
    this.zone.runOutsideAngular(() => {
      let budgetChart = am4core.create(`budgetChart`, am4charts.XYChart);

      budgetChart.data = budget.map(d => {
        return { "fac": d.faculty.fac_name, "budget": d.total_budget }
      })

      var categoryAxis = budgetChart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "fac";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      var valueAxis = budgetChart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 50;

      var series = budgetChart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = "budget";
      series.dataFields.categoryX = "fac";
      series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
      series.columns.template.strokeWidth = 0;

      series.tooltip.pointerOrientation = "vertical";

      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.fillOpacity = 0.8;

      // on hover, make corner radiuses bigger
      var hoverState = series.columns.template.column.states.create("hover");
      hoverState.properties.cornerRadiusTopLeft = 0;
      hoverState.properties.cornerRadiusTopRight = 0;
      hoverState.properties.fillOpacity = 1;

      series.columns.template.adapter.add("fill", function(fill, target) {
        return budgetChart.colors.getIndex(target.dataItem.index);
      });

      // Cursor
      budgetChart.cursor = new am4charts.XYCursor();
    });
  }

  counter(i: number) {
    return new Array(i);
  }

}
