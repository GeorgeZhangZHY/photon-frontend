import { Album } from '../../global/models';

export type ModifyAlbumAciton = {
    type: 'MODIFY_ALBUM',
    album: Album
};

export const modifyAlbum = (album: Album): ModifyAlbumAciton => ({
    type: 'MODIFY_ALBUM',
    album
});