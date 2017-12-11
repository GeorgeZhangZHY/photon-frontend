import { postData, deleteData, getData, putData } from './utils';
import { Comment, NewComment, CommentNotification } from '../global/models';

export const requestCommentsOfAlbum = (albumId: number) => (
    getData<Comment[]>(`/comments/${albumId}`)
);

export const addNewComment = (newComment: NewComment) => (
    postData('/comments', newComment)
);

export const delelteComment = (commentId: number) => (
    deleteData(`/comments/${commentId}`)
);

export const requestUnreadComments = (userId: number) => (
    getData<CommentNotification[]>(`/comments/unread/${userId}`)
);

export const setCommentRead = (commentId: number) => (
    putData('/comments/read', { commentId })
);
