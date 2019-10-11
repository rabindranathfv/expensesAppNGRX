import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/app/app.reducer';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public loading: boolean;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select('ui')
        .subscribe( (ui) => {
          this.loading = ui.isLoading;
        });
  }

  public onSubmit( data: any) {
    // console.log(data.email, data.password);
    this.authService.login(data.email, data.password);
  }

}
