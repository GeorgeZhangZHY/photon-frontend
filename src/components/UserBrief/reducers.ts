import { Store } from '../../global/mainReducer';
import { EnterUserSpaceAction } from './actions';

export const watchingUser = (
    state: Store['watchingUser'] = {
        avatarUrl: '', gender: '', identity: '', regionCode: 0, regionName: '', userId: 0, userName: ''
    },
    action: EnterUserSpaceAction
): Store['watchingUser'] => {
    switch (action.type) {
        case 'ENTER_USER_SPACE':
            return action.user;
        default:
            return state;
    }
};