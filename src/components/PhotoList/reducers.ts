import { Store } from '../../global/mainReducer';
import { EnterImageViewAction } from './actions';

export const currentPhotos = (
    state: Store['currentPhotos'] = [],
    action: EnterImageViewAction
): Store['currentPhotos'] => {
    switch (action.type) {
        case 'ENTER_IMAGE_VIEW':
            return action.photoUrls;
        default:
            return state;
    }
};

export const photoBeginIndex = (
    state: Store['photoBeginIndex'] = 0,
    action: EnterImageViewAction
): Store['photoBeginIndex'] => {
    switch (action.type) {
        case 'ENTER_IMAGE_VIEW':
            return action.initialIndex;
        default:
            return state;
    }
};
