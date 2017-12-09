import { UserBriefInfo } from '../../global/models';

export type EnterUserSpaceAction = {
    type: 'ENTER_USER_SPACE',
    user: UserBriefInfo
};

export const enterUserSpace = (user: UserBriefInfo): EnterUserSpaceAction => ({
    type: 'ENTER_USER_SPACE',
    user
});