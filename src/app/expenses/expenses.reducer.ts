import { createReducer, on } from '@ngrx/store';
import * as expensesActions from './expenses.actions';

import { IncomeOutcome } from '../models/income-outcome.model';

export interface StateExp {
    items: IncomeOutcome[];
}

export const initialState: StateExp = {
    items: []
};

const expensesReducer = createReducer(initialState,
  on(expensesActions.addIncomeOutcome, (state, { items } ) => ({ ...state, items: [...items]})),
  on(expensesActions.deleteAllIncomeOutcome, state => ({ ...state, items: []}))
);

export function ExpensesReducer(state, action) {
  return expensesReducer(state, action);
}
