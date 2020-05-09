import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expensesAppNGRX';

  constructor( public authService: AuthService) {
    this.userState();
   }

  userState() {
    this.authService.initAuthListener();
  }
}
