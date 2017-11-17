import * as React from 'react';
import { Post } from '../../global/models';

export type PostFeedComponentProps = {
    posts: Post[],
};

export class PostFeedComponent extends React.Component<PostFeedComponentProps> {

    render() {
        return (
            <div>
                {this.props.posts.map(post =>
                    <section key={post.postId}>
                        
                    </section>)}
            </div>
        );
    }
}
