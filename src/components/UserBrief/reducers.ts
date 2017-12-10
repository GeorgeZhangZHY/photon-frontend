import { Store } from '../../global/mainReducer';
import { FetchUserInfoAction } from './actions';

export const watchingUser = (
    state: Store['watchingUser'] = {
        avatarUrl: '', gender: '', identity: '', regionCode: 0, regionName: '', userId: 0, userName: ''
    },
    action: FetchUserInfoAction
): Store['watchingUser'] => {
    switch (action.type) {
        case 'FETCH_USER_INFO_FULFILLED':
            return action.payload;
        default:
            return state;
    }
};