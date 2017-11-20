import { } from '../../global/mainReducer';
import { PostDetailAction } from './actions';
import { Post } from '../../global/models';

const postItem = (
    state: Post = {
        postId: 0, content: '', cost: 0, costOption: '', isClosed: false,
        launchTime: '', ownerAvatarUrl: '', ownerGender: '',
        ownerId: 0, ownerIdentity: '', ownerName: '', photoUrls: [],
        requestNum: 0, requiredRegionCode: 0, requiredRegionName: '',
        tags: [], themeCoverUrl: '', themeId: 0, themeName: ''
    },
    action: PostDetailAction
): Post => {
    switch (action.type) {
        case 'CLOSE_POST_FULFILLED':
            return state.postId === action.postId ?
                { ...state, isClosed: true }
                : state;
        case 'ADD_NEW_REQUEST_FULFILLED':
            return state.postId === action.postId ?
                { ...state, requestNum: state.requestNum + 1 }
                : state;
        default:
            return state;
    }
};

export default postItem;