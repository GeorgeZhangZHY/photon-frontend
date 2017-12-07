import { getData } from './utils';
import { Activity } from '../global/models';

/**
 * 获取某用户关注的人的动态
 * @param userId 作为关注者的用户id
 * @param pageNum 
 * @param pageSize 
 */
export const requestFollowedActivities = (userId: number, pageNum: number, pageSize: number) => (
    getData<Activity[]>('/activities/followed', { userId, pageNum, pageSize })
);

/**
 * 获得某个用户的动态
 * @param userId 
 * @param pageNum 
 * @param pageSize 
 */
export const requestUserActivities = (userId: number, pageNum: number, pageSize: number) => (
    getData<Activity[]>('/activities/single', { userId, pageNum, pageSize })
);