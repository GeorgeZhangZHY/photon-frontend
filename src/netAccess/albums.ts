import { getData, putData, postData } from './utils';
import { Album, NewAlbum } from '../global/models';

export const requestLatestAlbums = (pageNum: number, pageSize: number) => (
    getData<Album[]>('/albums', { pageNum, pageSize })
);

export const requestUserAlbums = (userId: number, pageNum: number, pageSize: number) => (
    getData<Album[]>(`/albums/${userId}`, { pageNum, pageSize })
);

export const requestLikedAlbums = (userId: number, pageNum: number, pageSize: number) => (
    getData<Album[]>(`/albums/${userId}/liked`, { pageNum, pageSize })
);

export const modifyAlbum = (modifiedAlbum: Album) => putData('/albums', modifiedAlbum);

export const addNewAlbum = (newAlbum: NewAlbum) => postData('/albums', newAlbum);