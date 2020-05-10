import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../models/user.model';

import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth,
               private router: Router,
               private afStore: AngularFirestore,
              ) { }

  initAuthListener() {
    console.log('INIT AUTH LISTENER:::');
    this.afAuth.authState.subscribe( (authInf) => {
      console.log('lister ang fire:::', authInf);
    });
  }

  createUser( name: string, email: string, password: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword( email, password ).
              then( ({ user }) => {
                const newUser = new User(  user.uid, email, password);
                return this.afStore.collection('users').add({ ...newUser });
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
}
