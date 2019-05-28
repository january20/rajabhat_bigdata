import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formError = '';
  isSubmit = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.subscribeToFormChanged();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
  }

  submit(event) {
    event.preventDefault();
    this.isSubmit = true;

    const { username, password } = this.form.value;    

    this.authenticationService.login(username, password).subscribe(user => {      
      setTimeout(() => {
        if(user && user.token) {
          this.router.navigate([this.returnUrl]).then(() => location.reload(true));
        } else {
          this.formError = user.error;
          this.isSubmit = false;
        }
      }, 1000);      
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  subscribeToFormChanged() {
    this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => this.onValueChanged());
  }

  onValueChanged() {
    this.formError = '';
  }

}
