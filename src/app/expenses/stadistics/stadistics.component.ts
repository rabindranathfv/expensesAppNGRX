import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeOutcome } from 'src/app/models/income-outcome.model';
import { IncomeOutcomeService } from 'src/app/services/income-outcome/income-outcome.service';

@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styles: []
})
export class StadisticsComponent implements OnInit {

  income = 0;
  outcome = 0;
  totalIncome = 0;
  totalOutcome = 0;
  expenses: IncomeOutcome[] = [];

  constructor( private store: Store<AppState>,
               private incomeOutcomeService: IncomeOutcomeService) { }

  ngOnInit() {
    this.getAllExpenses();
  }

  /**
   * getAllExpenses
   */
  public getAllExpenses() {
    this.store.select('expenses').subscribe( (exp) => {
      this.expenses = [...exp.items];
      this.generateStadistics( this.expenses );
    });
  }
  /**
   * generateStadistics
   */
  public generateStadistics( expensesList) {
    if (expensesList.length > 0) {
      expensesList.forEach(exp => {
      if (exp.type === 'i') {
          this.income++;
          this.totalIncome += exp.amount;
        }
        if (exp.type === 'o') { 
          this.outcome++;
          this.totalOutcome += exp.amount;
        }
    });
    console.log(this.income, this.totalIncome, this.outcome, this.totalOutcome);
    }
  }

}
