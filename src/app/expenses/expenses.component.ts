import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IncomeOutcome } from '../models/income-outcome.model';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styles: []
})
export class ExpensesComponent implements OnInit {

  incomeOutcomeForm: FormGroup;
  typeOp = 'i';

  constructor( private fb: FormBuilder ) { }

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
  }

  /**
   * typeOperation
   */
  public typeOperation( type: string) {
    this.typeOp = type;
    console.log('operation Type::', this.typeOp);
  }

}
