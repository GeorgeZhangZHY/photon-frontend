import { requestLatestPosts } from '../../netAccess/posts';
import { Post } from '../../global/models';

export type PostFeedAction = {
    type: string,
    payload?: Post[] | Error
};

export const fetchLatestPosts = (pageNum: number, pageSize: number) => ({
    type: 'FETCH_LATEST_POSTS',
    payload: requestLatestPosts(pageNum, pageSize)
});