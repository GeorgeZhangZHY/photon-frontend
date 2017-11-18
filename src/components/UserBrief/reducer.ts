import { Store } from '../../global/mainReducer';
import { EnterUserSpaceAction } from './actions';

const watchingUser = (
    state: Store['watchingUser'] = {
        userId: 0, userName: '', identity: '', gender: '', regionCode: 0, regionName: '', avatarUrl: ''
    },
    action: EnterUserSpaceAction
): Store['watchingUser'] => {
    switch (action.type) {
        case 'ENTER_USER_SPACE_FULFILLED':
            return action.payload;
        default:
            return state;
    }
};

export default watchingUser;