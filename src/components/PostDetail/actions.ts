import { addNewRequest as postNewRequest } from '../../netAccess/request';

import { closePost as deletePost } from '../../netAccess/posts';

export type PostDetailAction = {
    type: string,
    postId?: number
    payload?: Error
};

export const closePost = (postId: number) => ({
    type: 'CLOSE_POST',
    postId,
    payload: deletePost(postId)
});

export const addNewRequest = (userId: number, postId: number, message: string) => ({
    type: 'ADD_NEW_REQUEST',
    postId,
    payload: postNewRequest(userId, postId, message)
});