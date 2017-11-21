import { User } from '../../global/models';

export type LoginAction = {
    type: 'USER_LOGIN',
    user: User
};

export const userLogin = (user: User): LoginAction => ({
    type: 'USER_LOGIN',
    user
});