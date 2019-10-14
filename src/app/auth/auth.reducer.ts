import * as fromAuth from './auth.action';
import { User } from '../interfaces/user.interface';

export interface AuthState {
    user: User;
}

const initAuthState: AuthState = {
    user: null
}

export function authReducer( state = initAuthState, action: fromAuth.actionsAuth): AuthState {
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: {
                    ...action.user
                }
            };

        default:
            return state;
    }
}
