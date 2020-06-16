import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IncomeOutcome } from '../models/income-outcome.model';

import { IncomeOutcomeService } from './../services/income-outcome/income-outcome.service';

// ngrx
import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';

import * as UI from '../share/ui.actions';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styles: []
})
export class ExpensesComponent implements OnInit {

  incomeOutcomeForm: FormGroup;
  typeOp = 'i';
  uidUser: any;

  loading = false;

  constructor( private fb: FormBuilder,
               private incomeOutcomeService: IncomeOutcomeService,
               private store: Store<AppState>
             ) {
    this.getLoadingState();
  }

  ngOnInit() {
    this.createIncomeOutComeForm();
  }

  /**
   * getLoadingState
   */
  public getLoadingState() {
    this.store.select('ui').subscribe( ({ isLoading }) => {
      this.loading = isLoading;
    });
  }

  /**
   * createIncomeOutComeForm
   */
  public createIncomeOutComeForm() {
    this.incomeOutcomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  /**
   * saveIncomeOutcome
   */
  public saveIncomeOutcome() {

    if (this.incomeOutcomeForm.valid) {
      console.log(this.incomeOutcomeForm.value);
      this.showLoading();
      const { description, amount } = this.incomeOutcomeForm.value;
      const incomeOutcome = new IncomeOutcome( description, amount, this.typeOp, );
      this.incomeOutcomeService.createIncomeOutcome( incomeOutcome ).
        then( (success) => {
          // agregar confirmacion exitosa en el front
          setTimeout(() => {
            console.log('SAVE INCOME:::');
            this.hideLoading();
          }, 1500);
          console.log(success);
        })
        .catch( (err) => {
          // agregar visualizacion del error en el front
          setTimeout(() => {
            console.log('SAVE INCOME:::');
            this.hideLoading();
          }, 1500);
          console.log(err.message);
        });
      this.incomeOutcomeForm.reset();
    }

  }

  /**
   * typeOperation
   */
  public typeOperation( type: string) {
    this.typeOp = type;
    console.log('operation Type::', this.typeOp);
  }

  // dispatchers

  showLoading() {
    this.store.dispatch( UI.showLoading() );
  }

  hideLoading() {
    this.store.dispatch( UI.hideLoading() );
  }

}
