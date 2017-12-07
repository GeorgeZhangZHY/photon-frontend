import * as React from 'react';
import { Post } from '../../global/models';
import PostList from '../PostList/PostList';
import { requestUserPosts } from '../../netAccess/posts';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';

type Props = {
    userId: number
};

type State = {
    posts: Post[]
};

export default class UserPostFeed extends React.Component<Props, State> {

    state = {
        posts: []
    };

    handleNewPosts = (newPosts: Post[]) => {
        this.setState(prevState => ({ posts: prevState.posts.concat(newPosts) }));
    }

    loadMorePosts = (pageNum: number, pageSize: number) => {
        return requestUserPosts(this.props.userId, pageNum, pageSize);
    }

    render() {
        return (
            <InfiniteScroll
                loadData={this.loadMorePosts}
                pageSize={10}
                onDataLoaded={this.handleNewPosts}
            >
                <PostList posts={this.state.posts} />
            </InfiniteScroll>
        );
    }
}