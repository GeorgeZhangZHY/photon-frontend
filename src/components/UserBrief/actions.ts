import { requestUserBriefInfo } from '../../netAccess/users';
import { UserBriefInfo } from '../../global/models';

export type EnterUserSpaceAction = {
    type: string,
    payload: UserBriefInfo
};

export const enterUserSpace = (userId: number) => ({
    type: 'ENTER_USER_SPACE',
    payload: requestUserBriefInfo(userId)
});
