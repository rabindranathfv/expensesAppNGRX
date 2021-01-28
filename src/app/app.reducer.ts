import { ActionReducerMap } from '@ngrx/store';
import * as ui from './share/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as expenses from './expenses/expenses.reducer';

export interface AppState {
    ui: ui.State;
    auth: auth.State;
    expenses: expenses.StateExp;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.UIReducer,
    auth: auth.AuthReducer,
    expenses: expenses.ExpensesReducer
};
