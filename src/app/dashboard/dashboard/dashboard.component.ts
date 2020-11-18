import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { IncomeOutcomeService } from 'src/app/services/income-outcome/income-outcome.service';

import * as expensesActions from '../../expenses/expenses.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {


  constructor( private store: Store<AppState>, public incomeOutcomeService: IncomeOutcomeService) { }
  
  ngOnInit() {
    this.getAllIncomeOutcome();
  }

  
  /**
   * getAllIncomeOutcome
   */
  public getAllIncomeOutcome() {
    this.incomeOutcomeService.getAllIIncomeOutCome()
    .pipe(
      map( snap => {
        return snap.map( doc => {
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          }
        })
      })
    )
    .subscribe((resp) => {
      console.log('data from FB:::', resp);
      this.setIncomeOutComeItems(resp);
    });
  }

  /**
   * setIncomeOutComeItems
   */
  public setIncomeOutComeItems( data: any) {
    this.store.dispatch( expensesActions.getAllIncomeOutCome({ items: data }) );    
  }

}
