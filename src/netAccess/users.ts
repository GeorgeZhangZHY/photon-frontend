import { getData } from './getWithoutParams';
import { UserBriefInfo } from '../global/models';

export const requestUserBriefInfo = (userId: number) => <Promise<UserBriefInfo>>getData('/users/' + userId);