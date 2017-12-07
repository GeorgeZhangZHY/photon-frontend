import { getData } from './utils';
import { Album } from '../global/models';

export const requestLatestAlbums = (pageNum: number, pageSize: number) => (
    getData<Album[]>('/albums', { pageNum, pageSize })
);

export const li = (userId: number, pageNum: number, pageSize: number) => (
    getData<Album[]>(`/albums/${userId}`, { pageNum, pageSize })
);

export const requestLikedAlbums = (userId: number, pageNum: number, pageSize: number) => (
    getData<Album[]>(`/albums/${userId}/liked`, { pageNum, pageSize })
);