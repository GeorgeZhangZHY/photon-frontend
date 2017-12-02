import * as React from 'react';
import PostEdit from '../PostEdit/PostEdit';
import { modifyPost } from '../../netAccess/posts';
import { Post } from '../../global/models';

export default class ModifyPost extends React.Component {

    handleSubmit = (post: Post) => {
        return modifyPost(post);
    }

    render() {
        return (
            <PostEdit title="修改约拍信息" submit={this.handleSubmit} />
        );
    }
}