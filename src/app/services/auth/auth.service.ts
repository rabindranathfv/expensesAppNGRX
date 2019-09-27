import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth,
               private router: Router ) { }

  createUser( name: string, email: string, password: any) {
    console.log(name, email, password);
    this.afAuth.auth.
        createUserWithEmailAndPassword( email, password ).
        then( (resp) => {
          console.log(resp);
          this.router.navigate(['/dashobard']);
        }).
        catch( (err) => {
          console.log(err);
        });
  }
}
