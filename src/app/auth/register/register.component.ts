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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  loading: boolean;
  registerForm: FormGroup;
  uiSubscription$: Subscription;

  constructor( public authService: AuthService,
               private fb: FormBuilder,
               private router: Router,
               private store: Store<AppState> ) { }

  ngOnInit() {
    this.createRegisterForm();
    this.uiSubscription$ = this.store.select('ui').subscribe( (ui) => {
      this.loading = ui.isLoading;
    });
  }

  createUser() {
    if ( this.registerForm.valid) {
      this.showLoading();
      const { name, email, password } = this.registerForm.value;
      this.authService.createUser(name, email, password).
      then( (resp) => {
        console.log(resp);
        this.hideLoading();
        this.router.navigate(['/dashobard']);
      }).
      catch( (err) => {
        console.log(err);
        this.hideLoading();
      });
    }
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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
