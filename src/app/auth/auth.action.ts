import { Action } from '@ngrx/store';
import { User } from '../interfaces/user.interface';

export const SET_USER = '[Auth] Set User';

export class setUserAction implements Action {
    readonly type = SET_USER;

    constructor( public user: User) { }
}

export type actionsAuth = setUserAction;
