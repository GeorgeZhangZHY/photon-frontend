import * as React from 'react';
import PostEdit from '../PostEdit/PostEdit';
import { modifyPost } from '../../netAccess/posts';
import { Post } from '../../global/models';

export type DispatchProps = {
    handleModifyPost: (post: Post) => void
};

export class ModifyPostComponent extends React.Component<DispatchProps> {

    handleSubmit = (post: Post) => {
        return modifyPost(post).then(() => this.props.handleModifyPost(post));
    }

    render() {
        return (
            <PostEdit title="修改约拍信息" onSubmit={this.handleSubmit} />
        );
    }
}