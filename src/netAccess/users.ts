import { getData, postData, putData } from './utils';
import { UserBriefInfo, User } from '../global/models';

export const requestUserBriefInfo = (userId: number) => getData<UserBriefInfo>('/users/' + userId);

export const checkIsUserNameUsed = (userName: string) => getData<{ isUsed: boolean }>(
    '/users/name/check',
    { userName }
).then(value => value.isUsed);

export const addNewUser = (newUser: Partial<User>) => postData('/users', newUser);

export const login = (userName: string, password: string) => postData('/login', {
    userName,
    password
}).then(response => <User>response.data);

/**
 * 修改除了头像和二维码之外的信息
 * @param modifiedUser 
 */
export const modifyUserInfo = (modifiedUser: User) => putData('/users', modifiedUser);
