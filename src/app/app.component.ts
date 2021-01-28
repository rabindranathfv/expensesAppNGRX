import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'expensesAppNGRX';

  constructor( public authService: AuthService) {
    this.userState();
   }

  userState() {
    this.authService.initAuthListener();
  }
}
