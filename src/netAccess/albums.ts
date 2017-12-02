import { getData } from './utils';
import { Album } from '../global/models';

export const requestLatestAlbums = (pageNum: number, pageSize: number) => (
    getData<Album[]>('/albums', { pageNum, pageSize })
);
