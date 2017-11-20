import { Store } from '../../global/mainReducer';
import { PostFeedAction } from './actions';
import { Post } from '../../global/models';

const posts = (
    state: Store['posts'] = [],
    action: PostFeedAction
): Store['posts'] => {
    switch (action.type) {
        case 'FETCH_LATEST_POSTS_FULFILLED':
            return <Post[]>action.payload;
        default:
            return state;
    }
};

export default posts;