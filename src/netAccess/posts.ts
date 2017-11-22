import { getData, deleteData } from './utils';
import { Post } from '../global/models';

export const requestLatestPosts = (pageNum: number, pageSize: number) => getData<Post[]>('/posts', {
    pageNum,
    pageSize
});

export const closePost = (postId: number) => deleteData(`/posts/${postId}`);
