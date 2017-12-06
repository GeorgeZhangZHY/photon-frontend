import * as React from 'react';
import { Post } from '../../global/models';
import PostBrief from '../PostBrief/PostBrief';

export type DispatchProps = {
    handleEnterDetail: (post: Post) => void
};

export type OwnProps = {
    posts: Post[]
};

type PostListComponentProps = DispatchProps & OwnProps;

export class PostListComponent extends React.Component<PostListComponentProps> {
    render() {
        return (
            <div>
                {this.props.posts.map(post =>
                    <PostBrief
                        key={post.postId}
                        handleEnterDetail={this.props.handleEnterDetail}
                        post={post}
                    />)}
            </div>
        );
    }
}
