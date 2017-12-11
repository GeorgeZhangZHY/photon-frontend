import { getData, postData, deleteData, putData } from './utils';
import { Like, LikeNotification } from '../global/models';

export const checkLike = (userId: number, albumId: number) => (
    getData<{ hasLiked: boolean }>('/likes/check', {
        userId,
        albumId
    }).then(value => value.hasLiked)
);

export const addNewLike = (userId: number, albumId: number) => (
    postData('/likes', {
        userId,
        albumId
    })
);

export const cancelLike = (userId: number, albumId: number) => (
    deleteData('/likes', {
        userId,
        albumId
    })
);

export const requestLikesOfAlbum = (albumId: number) => (
    getData<Like[]>(`/likes/album/${albumId}`)
);

export const requestUnreadLikes = (userId: number) => (
    getData<LikeNotification[]>(`/likes/unread/${userId}`)
);

export const setLikeRead = (likerId: number, albumId: number) => (
    putData('/likes/read', { likerId, albumId })
);