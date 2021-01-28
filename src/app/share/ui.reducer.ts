import { createReducer, on } from '@ngrx/store';
import * as uiActions from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false
};

const uiReducer = createReducer(initialState,
  on(uiActions.showLoading, state => ({ ...state, isLoading: true })),
  on(uiActions.hideLoading, state => ({ ...state, isLoading: false })),
);

export function UIReducer(state, action) {
  return uiReducer(state, action);
}
