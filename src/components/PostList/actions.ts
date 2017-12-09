import { Post } from '../../global/models';

export type EnterPostDetailAction = {
    type: 'ENTER_POST_DETAIL',
    post: Post
};

export const enterPostDetail = (post: Post): EnterPostDetailAction => ({
    type: 'ENTER_POST_DETAIL',
    post
});