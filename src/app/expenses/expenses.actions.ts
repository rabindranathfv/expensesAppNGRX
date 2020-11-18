import { createAction, props } from '@ngrx/store';
import { IncomeOutcome } from './../models/income-outcome.model';

export const addIncomeOutcome = createAction(
    '[Expenses Module] addIncomeOutcome',
    props<{ items: IncomeOutcome[] }>());
export const deleteAllIncomeOutcome = createAction('[Expenses Module] addIncomeOutcome');
export const getAllIncomeOutCome = createAction(
    '[Expenses Module] getAllIncomeOutCome',
    props<{ items: IncomeOutcome[] }>()
);