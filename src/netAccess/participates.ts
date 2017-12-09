import { getData, postData } from './utils';
import { Status, UserBriefInfo } from '../global/models';

type RequestCheckResult = {
    hasRequested: false
} | {
    hasRequested: true,
    status: Status
};

export const checkParticipateRequest = (userId: number, albumId: number) => (
    getData<RequestCheckResult>('/participates/check', {
        userId,
        albumId
    })
);

export const requestParticipants = (albumId: number) => getData<UserBriefInfo[]>(`/participates/album/${albumId}`);

export const addNewParticipateRequest = (albumId: number, userId: number) => postData('/participates', {
    albumId,
    userId
});