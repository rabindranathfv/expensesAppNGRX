 import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeOutcome } from 'src/app/models/income-outcome.model';
import { IncomeOutcomeService } from 'src/app/services/income-outcome/income-outcome.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit {

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
      this.expenses = [...exp.items.sort( (a:any, b:any) => a.amount - b.amount)];
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
  public deleteExpense( uidItem ) {
    console.log('Uid for delete', uidItem);
    this.incomeOutcomeService.deleteIncomeOutcome( uidItem )
        .then( (resp)=> {
          console.log('Delete item sucess:::', resp);
        }).catch( err => {
           console.log(err.mmessage) 
        });
  }

}
