import { postData, deleteData, getData } from './utils';
import { UserBriefInfo } from '../global/models';

export const addNewFollow = (userId: number, followerId: number) => postData('/follows', {
    userId,
    followerId
});

export const cancelFollow = (userId: number, followerId: number) => deleteData('/follows', {
    userId,
    followerId
});

export const checkFollow = (userId: number, followerId: number) => getData<{ hasFollowed: boolean }>(
    '/follows/check', {
        userId,
        followerId
    }).then(value => value.hasFollowed);

export const requestFollowedUsers = (followerId: number, pageNum: number, pageSize: number) => (
    getData<UserBriefInfo[]>('/follows/followed', {
        followerId,
        pageNum,
        pageSize
    })
);