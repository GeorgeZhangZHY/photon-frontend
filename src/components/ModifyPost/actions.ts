import { Post } from '../../global/models';

export type ModifyPostAction = {
    type: 'MODIFY_POST',
    post: Post
};

export const modifyPost = (post: Post): ModifyPostAction => ({
    type: 'MODIFY_POST',
    post
});