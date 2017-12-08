import { User } from '../../global/models';

export type ModifyUserInfoAction = {
    type: 'MODIFY_USER_INFO',
    modifiedUser: User
};

export const modifyUserInfo = (modifiedUser: User): ModifyUserInfoAction => ({
    type: 'MODIFY_USER_INFO',
    modifiedUser
});