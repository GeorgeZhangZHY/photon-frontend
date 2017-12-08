import { Store } from '../../global/mainReducer';
import { ModifyAlbumAciton } from './actions';

export const currentAlbum = (
    state: Store['currentAlbum'] = {
        albumId: 0, albumName: '', coverOrdinal: 0, createTime: '', description: '',
        photoUrls: [], shotDevice: '', shotLocation: '', shotTime: '', tags: [], userId: 0
    },
    action: ModifyAlbumAciton
): Store['currentAlbum'] => {
    switch (action.type) {
        case 'MODIFY_ALBUM':
            return action.album;
        default:
            return state;
    }
};