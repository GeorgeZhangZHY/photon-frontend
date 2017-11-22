import * as React from 'react';
import { Post, Filter } from '../../global/models';
import PostList from '../PostList/PostList';
import { requestLatestPosts } from '../../netAccess/posts';

export type StateProps = {
    filter: Filter
};

export type LatestPostFeedComponentProps = StateProps;

export class LatestPostFeedComponent extends React.Component<LatestPostFeedComponentProps, {
    currentPageNum: number,
    pageSize: number,
    posts: Post[]
}> {

    constructor(props: LatestPostFeedComponentProps) {
        super(props);
        this.state = {
            currentPageNum: -1,
            pageSize: 10,
            posts: []
        };
    }

    loadMorePosts = () => {
        const { currentPageNum, pageSize } = this.state;
        requestLatestPosts(currentPageNum + 1, pageSize)
            .then(posts => this.setState(prevState => ({
                posts: prevState.posts.concat(posts)
            })));
    }

    componentDidMount() {
        this.loadMorePosts();
        // window.onscroll
    }

    render() {
        return (
            <PostList posts={this.state.posts} />
        );
    }
}