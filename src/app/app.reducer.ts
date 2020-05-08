import { ActionReducerMap } from '@ngrx/store';
import * as ui from './share/ui.reducer';

export interface AppState {
    ui: ui.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.UIReducer
};
