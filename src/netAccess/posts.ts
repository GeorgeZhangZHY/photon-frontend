import { getData, deleteData, postData, putData } from './utils';
import { Post, NewPost, Condition } from '../global/models';

export const requestLatestPosts = (pageNum: number, pageSize: number, condition?: Condition) =>
    getData<Post[]>('/posts', {
        pageNum,
        pageSize,
        ...condition
    });

export const requestUserPosts = (userId: number, pageNum: number, pageSize: number) => (
    getData<Post[]>(`/posts/user/${userId}`, {
        pageNum,
        pageSize
    })
);

export const closePost = (postId: number) => deleteData(`/posts/${postId}`);

export const addNewPost = (newPost: NewPost) => postData('/posts', newPost);

export const modifyPost = (modifiedPost: Post) => putData('/posts', modifiedPost);