import { Component, OnInit } from '@angular/core';

// ngrx
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loading: boolean;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.select('ui').subscribe( ui => {
      console.log(ui);
    });
  }

}
