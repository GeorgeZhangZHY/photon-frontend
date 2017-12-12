import { getData, postData, putData } from './utils';
import { Status, UserBriefInfo, ParticipateNotification } from '../global/models';

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

export const requestParticipateResults = (applicantId: number) => (
    getData<ParticipateNotification[]>(`/participates/result/${applicantId}`)
);

export const setParticipateResultRead = (albumId: number, userId: number, prevStatus: 'agreed' | 'rejected') => (
    putData('/participates/result', { albumId, userId, prevStatus })
);

export const requestParticipateRequests = (userId: number) => (
    getData<ParticipateNotification[]>(`/participates/request/${userId}`)
);

export const resolveParticipate = (albumId: number, applicantId: number, agreed: boolean) => (
    putData('/participates', {
        albumId,
        applicantId,
        agreed
    })
);