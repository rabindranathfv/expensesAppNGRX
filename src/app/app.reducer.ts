import { ActionReducerMap } from '@ngrx/store';
import * as ui from './share/ui.reducer';
import * as auth from './auth/auth.reducer';

export interface AppState {
    ui: ui.State;
    auth: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.UIReducer,
    auth: auth.AuthReducer
};
