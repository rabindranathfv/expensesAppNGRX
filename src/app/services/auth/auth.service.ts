import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

// interfaces
import { User } from '../../interfaces/user.interface';

import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from 'src/app/share/ui.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth,
               private router: Router,
               private afDB: AngularFirestore,
               private store: Store<AppState>
  ) { }

  public createUser( name: string, email: string, password: any) {
    console.log(name, email, password);
    this.store.dispatch( new ActivateLoadingAction() );
    this.afAuth.auth.
        createUserWithEmailAndPassword( email, password )
        .then( (resp) => {
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
                this.store.dispatch( new DeactivateLoadingAction() );
                Swal.fire('Create account sucessfully', `user ${name} and email ${resp.user.email}` , 'success');
                this.router.navigate(['/login']);
              })
              .catch( (err) => {
                this.store.dispatch( new DeactivateLoadingAction() );
                console.log(err);
              });
        }).
        catch( (err) => {
          console.log(err);
          this.store.dispatch( new DeactivateLoadingAction() );
          Swal.fire('error create user account', err.message, 'error');
        });
  }

  public login(email, password) {
    console.log(email, password);
    this.store.dispatch( new ActivateLoadingAction() );
    this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then( (resp) => {
          // console.log(resp);
          this.store.dispatch( new DeactivateLoadingAction() );
          Swal.fire('Login sucessfully', `Welcome ${resp.user.email}` , 'success');
          this.router.navigate(['/dashobard']);
        })
        .catch( (err) => {
          console.log(err);
          this.store.dispatch( new DeactivateLoadingAction() );
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
