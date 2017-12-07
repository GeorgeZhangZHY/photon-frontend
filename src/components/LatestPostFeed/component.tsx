import * as React from 'react';
import { Post, Filter, Condition } from '../../global/models';
import PostList from '../PostList/PostList';
import { requestLatestPosts } from '../../netAccess/posts';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';

export type StateProps = {
    filter: Filter
};

type Props = StateProps;

type State = {
    posts: Post[]
};

export class LatestPostFeedComponent extends React.Component<Props, State> {

    state = {
        posts: []
    };

    loadMorePosts = (pageNum: number, pageSize: number) => {
        let condition: any = undefined;
        const { filter } = this.props;
        Object.getOwnPropertyNames(filter).forEach(key => {
            const value = filter[key];
            if (value !== 0 && value !== '全部') {
                condition[key] = value;
            }
        });
        return requestLatestPosts(pageNum, pageSize, condition as Condition);
    }

    handleNewPosts = (newPosts: Post[]) => {
        this.setState(prevState => ({ posts: prevState.posts.concat(newPosts) }));
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