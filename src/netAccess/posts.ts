import { getData, deleteData, postData, putData } from './utils';
import { Post, NewPost } from '../global/models';

export const requestLatestPosts = (pageNum: number, pageSize: number) => getData<Post[]>('/posts', {
    pageNum,
    pageSize
});

export const closePost = (postId: number) => deleteData(`/posts/${postId}`);

export const addNewPost = (newPost: NewPost) => postData('/posts', newPost);

export const modifyPost = (modifiedPost: Post) => putData('/posts', modifiedPost);