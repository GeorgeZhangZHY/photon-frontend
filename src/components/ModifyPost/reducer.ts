import { Store } from '../../global/mainReducer';
import { ModifyPostAction } from './actions';

const currentPost = (
    state: Store['currentPost'] = {
        postId: 0, content: '', cost: 0, costOption: '', isClosed: false,
        createTime: '', ownerAvatarUrl: '', ownerGender: '',
        ownerId: 0, ownerIdentity: '', ownerName: '', photoUrls: [],
        requestNum: 0, requiredRegionCode: 0, requiredRegionName: '',
        tags: []
    },
    action: ModifyPostAction
): Store['currentPost'] => {
    switch (action.type) {
        case 'MODIFY_POST':
            return action.post;
        default:
            return state;
    }
};

export default currentPost;