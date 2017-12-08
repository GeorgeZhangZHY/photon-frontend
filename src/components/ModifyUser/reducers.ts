import { Store } from '../../global/mainReducer';
import { ModifyUserInfoAction } from './actions';

export const currentUser = (
    state: Store['currentUser'] = {
        avatarUrl: '', gender: '', identity: '', phoneNum: '',
        qqNum: 0, regionCode: 0, regionName: '', userId: 0,
        userName: '', wechatId: '', wechatQRCodeUrl: ''
    },
    action: ModifyUserInfoAction
): Store['currentUser'] => {
    switch (action.type) {
        case 'MODIFY_USER_INFO':
            return action.modifiedUser;
        default:
            return state;
    }
};