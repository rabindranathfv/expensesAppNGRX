import { createReducer, on } from '@ngrx/store';
import * as expensesActions from './expenses.actions';

import { IncomeOutcome } from '../models/income-outcome.model';

export interface StateExp {
    expenses: IncomeOutcome;
}

export const initialState: StateExp = {
    expenses: null
};

const expensesReducer = createReducer(initialState,
  on(expensesActions.addIncomeOutcome, (state, { expenses }) => ({ ...state, user: { ...user} })),
);

export function ExpensesReducer(state, action) {
  return expensesReducer(state, action);
}
