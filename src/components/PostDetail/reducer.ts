import { Store } from '../../global/mainReducer';
import { PostDetailAction } from './actions';
import { PostListAction } from '../PostList/actions';

const currentPost = (
    state: Store['currentPost'] = {
        postId: 0, content: '', cost: 0, costOption: '', isClosed: false,
        createTime: '', ownerAvatarUrl: '', ownerGender: '',
        ownerId: 0, ownerIdentity: '', ownerName: '', photoUrls: [],
        requestNum: 0, requiredRegionCode: 0, requiredRegionName: '',
        tags: []
    },
    action: PostDetailAction | PostListAction
): Store['currentPost'] => {
    switch (action.type) {
        case 'CLOSE_POST':
            return { ...state, isClosed: true };
        case 'ADD_NEW_REQUEST':
            return { ...state, requestNum: state.requestNum + 1 };
        case 'ENTER_POST_DETAIL':
            return action.post;
        default:
            return state;
    }
};

export default currentPost;