import { showLoading, hideLoading } from './../../share/ui.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


// ngrx
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';

import * as UI from '../../share/ui.actions';

// services
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean;
  loginForm: FormGroup;

  uiSubscription$: Subscription;

  constructor( private store: Store<AppState>,
               private fb: FormBuilder,
               private router: Router,
               public authService: AuthService ) { }

  ngOnInit() {
    this.createLoginForm();
    this.uiSubscription$ = this.store.select('ui').subscribe( ui => {
      console.log(ui);
      this.loading = ui.isLoading;
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
      this.showLoading();
      const { email, password } = this.loginForm.value;
      this.authService.login( email, password ).
      then( (credentials) => {
        console.log(credentials);
        this.hideLoading();
        this.router.navigate(['/dashobard']);
      }).
      catch((err) => {
        console.log(err);
        this.hideLoading();
        // larzar mensaje de error con sweet alert
      });
    }
  }

  ngOnDestroy() {
    this.uiSubscription$.unsubscribe();
  }

  // dispatchers

  showLoading() {
    this.store.dispatch( UI.showLoading() );
  }

  hideLoading() {
    this.store.dispatch( UI.hideLoading() );
  }
}
