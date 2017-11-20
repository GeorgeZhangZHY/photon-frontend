import { postData, getData } from './utils';
import {  } from '../global/models';

export const addNewRequest = (userId: number, postId: number, message: string) => postData('/requests', {
    userId,
    postId,
    message
});

export const checkRequest = (requesterId: number, postId: number) => getData<{ hasRequested: boolean }>(
    '/follows/check', {
    requesterId,
    postId
}).then(value => value.hasRequested);