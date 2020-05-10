import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import * as UI from '../ui.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public authService: AuthService,
               private router: Router,
               private store: Store<AppState>  ) { }

  ngOnInit() {
  }

  logout() {
    this.showLoading();
    this.authService.logout()
      .then( (resp) => {
        this.hideLoading();
        this.router.navigate(['/login']);
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  // dispatchers

  showLoading() {
    this.store.dispatch( UI.showLoading() );
  }

  hideLoading() {
    this.store.dispatch( UI.hideLoading() );
  }

}
