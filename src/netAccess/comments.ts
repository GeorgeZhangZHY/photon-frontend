import { postData, deleteData, getData } from './utils';
import { Comment, NewComment } from '../global/models';

export const requestCommentsOfAlbum = (albumId: number) => (
    getData<Comment[]>(`/comments/${albumId}`)
);

export const addNewComment = (newComment: NewComment) => (
    postData('/comments', newComment)
);

export const delelteComment = (commentId: number) => (
    deleteData(`/comments/${commentId}`)
);