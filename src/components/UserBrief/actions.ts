import { UserBriefInfo } from '../../global/models';
import { requestUserBriefInfo } from '../../netAccess/users';

export type FetchUserInfoAction = {
    type: 'FETCH_USER_INFO_PENDING',
} | {
    type: 'FETCH_USER_INFO_FULFILLED',
    payload: UserBriefInfo
}|{
    type: 'FETCH_USER_INFO_REJECTED',
    payload: Error
};

export const fetchUserInfo = (userId: number) => ({
    type: 'FETCH_USER_INFO',
    payload: requestUserBriefInfo(userId)
});