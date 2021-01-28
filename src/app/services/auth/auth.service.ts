import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { User } from './../../models/user.model';

import { map } from 'rxjs/operators';

import 'firebase/firestore';
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
  userKeyFB: any;
  userSubscription$: Subscription;

  constructor( public afAuth: AngularFireAuth,
               private afStore: AngularFirestore,
               private store: Store<AppState>
              ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (authInf) => {
      console.log('ANGULAR FIRE AUTH STATE::::', authInf);
      if (authInf) {
        const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${authInf.uid}`);
        this.userSubscription$ = this.afStore.collection('users').snapshotChanges().subscribe( user => {
          const usersList = user.map( u => {
            return { uid: u.payload.doc['_document'].proto.fields.uid,
                    userKeyFB: u.payload.doc.id
                };
          }).find( (u) => {
            return u.uid.stringValue === authInf.uid;
          });
          this.userKeyFB = usersList.userKeyFB;
          this.user = user ? user[0].payload.doc['_document'].proto.fields : '';
        });
        const newUser = { ...this.user };
        const userInfo = new User(authInf.uid, authInf.email, newUser.name );
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

  getallUsers() {
    return this.afStore.collection('users').snapshotChanges();
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
