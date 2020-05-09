import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// ngrx
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';

// services
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loading: boolean;
  loginForm: FormGroup;

  constructor( private store: Store<AppState>,
               private fb: FormBuilder,
               private router: Router,
               public authService: AuthService ) { }

  ngOnInit() {
    this.createLoginForm();
    this.store.select('ui').subscribe( ui => {
      console.log(ui);
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const { email, password } = this.loginForm.value;
      this.authService.login( email, password ).
      then( (credentials) => {
        console.log(credentials);
        this.router.navigate(['/dashobard']);
      }).
      catch((err) => {
        console.log(err);
      });
    }
  }

}
