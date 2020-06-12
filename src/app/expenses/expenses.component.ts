import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IncomeOutcome } from '../models/income-outcome.model';

import { IncomeOutcomeService } from './../services/income-outcome/income-outcome.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styles: []
})
export class ExpensesComponent implements OnInit {

  incomeOutcomeForm: FormGroup;
  typeOp = 'i';
  uidUser : any;

  constructor( private fb: FormBuilder,
               private incomeOutcomeService: IncomeOutcomeService ) { }

  ngOnInit() {
    this.createIncomeOutComeForm();
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
    }
    const { description, amount } = this.incomeOutcomeForm.value;
    const incomeOutcome = new IncomeOutcome( description, amount, this.typeOp, );
    this.incomeOutcomeService.createIncomeOutcome( incomeOutcome ).
        then( (success) => {
          console.log(success);
        })
        .catch( (err) => {
          console.log(err.message);
        });
    this.incomeOutcomeForm.reset();
  }

  /**
   * typeOperation
   */
  public typeOperation( type: string) {
    this.typeOp = type;
    console.log('operation Type::', this.typeOp);
  }

}
