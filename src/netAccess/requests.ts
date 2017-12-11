import { postData, getData, putData } from './utils';
import { OthersRequest } from '../global/models';

export const addNewRequest = (userId: number, postId: number, message: string) => postData('/requests', {
    userId,
    postId,
    message
});

export const checkHasRequested = (requesterId: number, postId: number) => getData<{ hasRequested: boolean }>(
    '/follows/check', {
        requesterId,
        postId
    }
).then(value => value.hasRequested);

export const requestUnreadOthersRequests = (userId: number) => (
    getData<OthersRequest[]>(`/requests/others/unread/${userId}`)
);

export const setRequestRead = (requesterId: number, postId: number) => (
    putData('/requests/others/read', { postId, requesterId })
);