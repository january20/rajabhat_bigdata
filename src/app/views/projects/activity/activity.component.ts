import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  project: Array<Object>;
  form: FormGroup;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadData();
  }

  loadData() {
    this.projectService.getProject(this.route.snapshot.params.id).subscribe((data: any) => this.project = data);
  }
  
  addFiles(files: File[]) {  
    files.forEach(file => {
      const reader = new FileReader();
   
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        console.log(content);
      };

      reader.readAsDataURL(file);
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      objective: ['', Validators.required],
      kpi: ['', Validators.required],
      files: []
    });
  }

}
