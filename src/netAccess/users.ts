import { getData } from './utils';
import { UserBriefInfo } from '../global/models';

export const requestUserBriefInfo = (userId: number) => <Promise<UserBriefInfo>>getData('/users/' + userId);