import * as React from 'react';
import PostEdit from '../PostEdit/PostEdit';
import { Post, NewPost } from '../../global/models';
import { addNewPost } from '../../netAccess/posts';

export type StateProps = {
    currentUserId: number
};

type Props = StateProps;

export class AddPostComponent extends React.Component<Props> {

    handleSubmit = (post: Post) => {
        const newPost: NewPost = {
            content: post.content,
            cost: post.cost,
            costOption: post.costOption,
            ownerId: this.props.currentUserId,
            photoUrls: post.photoUrls,
            requiredRegionCode: post.requiredRegionCode,
            tags: post.tags,
        };
        return addNewPost(newPost);
    }

    render() {
        return (
            <PostEdit title="发布约拍信息" onSubmit={this.handleSubmit} />
        );
    }
}