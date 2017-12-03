import { Album } from '../../global/models';

export type AlbumBriefAction = {
    type: 'ENTER_ALBUM_DETAIL',
    album: Album
};

export const enterAlbumDetail = (album: Album) => ({
    type: 'ENTER_ALBUM_DETAIL',
    album 
});