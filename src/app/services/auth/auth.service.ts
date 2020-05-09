import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth,
               private router: Router ) { }

  initAuthListener() {
    console.log('INIT AUTH LISTENER:::');
    this.afAuth.authState.subscribe( (authInf) => {
      console.log('lister ang fire:::', authInf);
      console.log( authInf ? authInf.uid : null);
    });
  }

  createUser( name: string, email: string, password: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword( email, password );
  }

  login( email: string, password: string ) {
    return this.afAuth.auth.signInWithEmailAndPassword( email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
