 import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeOutcome } from 'src/app/models/income-outcome.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit {

  expenses: IncomeOutcome[] = [];;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.getAllExpenses();
  }

  /**
   * getAllExpenses
   */
  public getAllExpenses() {
    this.store.select('expenses').subscribe( (exp) => {
      this.expenses = [...exp.items];
    });
  }

  /**
   * expenseType
  */
  public expenseType( type ) {
    if (!type) return;
    return type === 'i';
  }

  /**
   * deleteExpense
   */
  public deleteExpense( uid ) {
    console.log('Uid for delete', uid);
  }

}
