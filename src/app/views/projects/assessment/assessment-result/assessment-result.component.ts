import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SuggestionsComponent } from './suggestions/suggestions.component';

@Component({
  selector: 'app-assessment-result',
  templateUrl: './assessment-result.component.html',
  styleUrls: ['./assessment-result.component.scss'],
  animations: [
    trigger('suggestionExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssessmentResultComponent implements OnInit {

  project: any;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['name', 'achieve', 'not_achieve', 'suggestion'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.projectService.getAssessmentResult(this.route.snapshot.params.id).subscribe((data: any) => {
      this.project = data;
      this.dataSource = new MatTableDataSource(data.assessment_result);
    });
  }

  openSuggestions(suggestions): void {
    this.dialog.open(SuggestionsComponent, {
      width: '50%',
      data: { suggestions: suggestions }
    });
  }
}
