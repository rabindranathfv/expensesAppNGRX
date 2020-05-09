
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor( private router: Router,
               private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuth().pipe(
      tap( state => {
        if ( !state ) { this.router.navigate(['/login']); }
      })
    );
  }

}