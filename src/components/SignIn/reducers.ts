import { Store } from '../../global/mainReducer';
import { LoginAction } from './actions';

export const currentUser = (
    state: Store['currentUser'] = {
        avatarUrl: '', gender: '', identity: '', phoneNum: '',
        qqNum: 0, regionCode: 0, regionName: '', userId: 0,
        userName: '', wechatId: '', wechatQRCodeUrl: ''
    },
    action: LoginAction
): Store['currentUser'] => {
    switch (action.type) {
        case 'USER_LOGIN':
            return action.user;
        default:
            return state;
    }
};
