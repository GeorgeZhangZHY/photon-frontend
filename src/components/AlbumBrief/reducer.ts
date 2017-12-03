import { Store } from '../../global/mainReducer';
import { AlbumBriefAction } from './actions';

export const currentAlbum = (
    state: Store['currentAlbum'] = {
        albumId: 0, albumName: '', coverOrdinal: 0, createTime: '', description: '',
        photoUrls: [], shotDevice: '', shotLocation: '', shotTime: '', tags: [],
        themeCoverUrl: '', themeId: 0, themeName: '', userId: 0
    },
    action: AlbumBriefAction
): Store['currentAlbum'] => {
    switch (action.type) {
        case 'ENTER_ALBUM_DETAIL':
            return action.album;
        default:
            return state;
    }
};
