import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public authService: AuthService,
               private router: Router  ) { }

  ngOnInit() {
  }

  logout() {
    // lanzar loading
    this.authService.logout()
      .then( (resp) => {
        console.log('LOGOUT:::', resp);
        // cerrar loading
        this.router.navigate(['/login']);
      })
      .catch( (err) => {
        console.log(err);
      });
  }

}
