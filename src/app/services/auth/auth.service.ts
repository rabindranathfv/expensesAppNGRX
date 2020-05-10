import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../models/user.model';

import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import * as AuthActions from '../../auth/auth.actions';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  userSubscription$: Subscription;

  constructor( public afAuth: AngularFireAuth,
               private router: Router,
               private afStore: AngularFirestore,
               private store: Store<AppState>
              ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (authInf) => {
      console.log(authInf);
      if (authInf) {
        const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${authInf.uid}`);
        this.userSubscription$ = this.afStore.collection('users').snapshotChanges().subscribe( user => {
          this.user = user ? user[0].payload.doc['_document'].proto.fields : '';
        });
        const test = { ...this.user };
        const userInfo = new User(authInf.uid, authInf.email, test.name );
        this.setUser( {...userInfo });
      } else {
        this.userSubscription$.unsubscribe();
        this.unSetUser();
      }
     });
  }

  createUser( name: string, email: string, password: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword( email, password ).
              then( ({ user }) => {
                const newUser = new User(  user.uid, email, name);
                return this.afStore.collection(`users`).add({ ...newUser });
              });
  }

  login( email: string, password: string ) {
    return this.afAuth.auth.signInWithEmailAndPassword( email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map( fbUser => fbUser != null )
    );
  }

  // dispatchers

  setUser( user: User ) {
    this.store.dispatch( AuthActions.setUser( { user: {...user } } ) );
  }

  unSetUser() {
    this.store.dispatch( AuthActions.unSetUser() );
  }
}
