import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth,
               private router: Router ) { }

  public createUser( name: string, email: string, password: any) {
    console.log(name, email, password);
    this.afAuth.auth.
        createUserWithEmailAndPassword( email, password ).
        then( (resp) => {
          console.log(resp);
          this.router.navigate(['/dashobard']);
        }).
        catch( (err) => {
          console.log(err);
          Swal.fire('error create user account', err.message, 'error');
        });
  }

  public login(email, password) {
    console.log(email, password);
    this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then( (resp) => {
          console.log(resp);
          this.router.navigate(['/dashobard']);
        })
        .catch( (err) => {
          console.log(err);
          Swal.fire('error with your credentials', err.message, 'error');
        });
  }
}
