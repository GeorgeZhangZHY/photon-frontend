import { Store } from '../../global/mainReducer';
import { EnterPostDetailAction } from './actions';

export const currentPost = (
    state: Store['currentPost'] = {
        postId: 0, content: '', cost: 0, costOption: '', isClosed: false,
        createTime: '', ownerAvatarUrl: '', ownerGender: '',
        ownerId: 0, ownerIdentity: '', ownerName: '', photoUrls: [],
        requestNum: 0, requiredRegionCode: 0, requiredRegionName: '',
        tags: []
    },
    action: EnterPostDetailAction
): Store['currentPost'] => {
    switch (action.type) {
        case 'ENTER_POST_DETAIL':
            return action.post;
        default:
            return state;
    }
};