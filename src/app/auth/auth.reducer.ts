import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';

import { User } from '../models/user.model';

export interface State {
    user: User
}

export const initialState: State = {
    user: null
};

const authReducer = createReducer(initialState,
  on(authActions.setUser, (state, { user }) => ({ ...state, user: { ...user} })),
  on(authActions.unSetUser, (state) => ({ ...state, user: null }))
);

export function AuthReducer(state, action) {
  return authReducer(state, action);
}
