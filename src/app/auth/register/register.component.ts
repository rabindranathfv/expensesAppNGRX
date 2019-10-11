import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/app/app.reducer';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  public loading: boolean;
  public subscription: Subscription;

  constructor( public authService: AuthService,
               public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
                            .subscribe( (ui) => {
                              console.log(ui);
                              this.loading = ui.isLoading;
                            });
  }

  onSubmit(data: any) {
    // console.log(data);
    const { name, email, password } = data;
    this.authService.createUser(name, email, password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
