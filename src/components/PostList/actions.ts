import { Post } from '../../global/models';

export type PostListAction = {
    type: 'ENTER_POST_DETAIL',
    post: Post
};

export const enterPostDetail = (post: Post) => ({
    type: 'ENTER_POST_DETAIL',
    post
});