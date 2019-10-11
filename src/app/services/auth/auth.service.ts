import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

// interfaces
import { User } from '../../interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth,
               private router: Router,
               private afDB: AngularFirestore
  ) { }

  public createUser( name: string, email: string, password: any) {
    console.log(name, email, password);
    this.afAuth.auth.
        createUserWithEmailAndPassword( email, password ).
        then( (resp) => {
          console.log(resp);
          const user: User = {
            uid: resp.user.uid,
            name,
            email: resp.user.email
          };
          this.afDB.collection('user')
              .doc(`${user.uid}`)
              .set(user)
              .then( () => {
                this.router.navigate(['/dashobard']);
              })
              .catch( (err) => {
                console.log(err);
              });
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
          // console.log(resp);
          this.router.navigate(['/dashobard']);
        })
        .catch( (err) => {
          console.log(err);
          Swal.fire('error with your credentials', err.message, 'error');
        });
  }

  public logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  /**
   * isLogIn
   */
  public isLogIn(): any {
    this.afAuth.authState.subscribe( (fireUser: firebase.User) => {
      console.log(fireUser);
    });
  }

  public isAuth() {
    return this.afAuth.authState
            .pipe( map( fireUser => {
                  if (fireUser == null) {
                    this.router.navigate(['/login']);
                  }
                  return fireUser != null;
                }
              )
            );
  }
}
