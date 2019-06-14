import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ProjectService } from '../projects/shared/project.service';
import { MatSnackBar } from '@angular/material';
import { FamiliesService } from '../families/shared/families.service';
import { ExpertService } from '../experts/shared/expert.service';
import { OtopService } from '../otop/shared/otop.service';
import { BioService } from '../bio/shared/bio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  myProjectList: any;
  myEvaluationList: any;
  adminProjectList: any;
  adminExpertList: any;
  adminOtopList: any;
  families: any;
  countMyExperts: number;
  countMyOtop: number;
  countMyPlants: number;
  countMyAnimals: number;

  constructor(
    private authService: AuthenticationService,
    private projectService: ProjectService,
    private expertService: ExpertService,
    private otopService: OtopService,
    private familiesService: FamiliesService,
    private bioService: BioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const user = this.authService.currentUserValue;

    this.expertService.count().subscribe((count: number) => this.countMyExperts = count);
    this.bioService.animalsCount().subscribe((count: number) => this.countMyAnimals = count);
    this.bioService.plantsCount().subscribe((count: number) => this.countMyPlants = count);
    this.otopService.count().subscribe((count: number) => this.countMyOtop = count);

    if(user.roles.admin) {
      this.projectService.getProjectList().subscribe((data: any) => this.adminProjectList = data);
    }

    if(user.roles.srru_personnel) {
      this.projectService.getMyProjectList().subscribe((data: any) => this.myProjectList = data);
    }

    if(user.roles.project_assessor) {
      this.projectService.getAssessmentProjects(user.info.assessor_kpi_id).subscribe((data: any) => this.myEvaluationList = data);
    }

    if(user.roles.village_headman) {
      this.familiesService.getAll().subscribe((data: any) => this.families = data);
    }

    this.currentUser = user;
  }

  deleteProject(id) {
    this.projectService.deleteProject(id).subscribe(
      data => {
        this.snackBar.open('ลบโครงการสำเร็จ', '', {
          horizontalPosition: 'right',
          duration: 2000,
          panelClass: ['color-white', 'bg-success']
        });
        this.loadData();
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteExpert(id) {
    this.expertService.delete(id).subscribe(
      data => {
        this.snackBar.open('ลบผู้เชี่ยวชาญสำเร็จ', '', {
          horizontalPosition: 'right',
          duration: 2000,
          panelClass: ['color-white', 'bg-success']
        });
        this.loadData();
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteOtop(id) {
    this.otopService.destroy(id).subscribe(
      data => {
        this.snackBar.open('ลบสินค้าสำเร็จ', '', {
          horizontalPosition: 'right',
          duration: 2000,
          panelClass: ['color-white', 'bg-success']
        });
        this.loadData();
      },
      err => {
        console.log(err);
      }
    );
  }

}
