import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { IncomeOutcomeService } from 'src/app/services/income-outcome/income-outcome.service';

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
    this.incomeOutcomeService.getAllIIncomeOutCome().subscribe((resp) => {
      console.log('data from FB:::', resp);
    });
  }

}
