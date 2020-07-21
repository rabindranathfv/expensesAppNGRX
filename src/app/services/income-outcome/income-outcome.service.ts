import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

import { IncomeOutcome } from '../../models/income-outcome.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeOutcomeService {

  constructor( private afStore: AngularFirestore,
               private authService: AuthService ) { }

  createIncomeOutcome( incomeOutcome: IncomeOutcome) {
    const uid = this.authService.user.uid.stringValue;
    console.log('income DATA:::', incomeOutcome);
    const userKeyFB = this.authService.userKeyFB ? this.authService.userKeyFB : '';
    return this.afStore.doc(`${uid}/income-outcome`).collection(`${uid}`)
        .add({ ...incomeOutcome} );
  }
}
