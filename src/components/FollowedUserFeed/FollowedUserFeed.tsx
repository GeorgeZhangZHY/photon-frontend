import * as React from 'react';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import UserBrief from '../UserBrief/UserBrief';
import { UserBriefInfo } from '../../global/models';
import { requestFollowedUsers } from '../../netAccess/follows';

type Props = {
    followerId: number
};

type State = {
    followedUsers: UserBriefInfo[]
};

export default class FollowedUserFeed extends React.Component<Props, State> {

    state: State = {
        followedUsers: []
    };

    handleNewUsers = (newUsers: UserBriefInfo[]) => {
        this.setState(prevState => ({ followedUsers: prevState.followedUsers.concat(newUsers) }));
    }

    handleLoadMore = (pageNum: number, pageSize: number) => {
        return requestFollowedUsers(this.props.followerId, pageNum, pageSize);
    }

    render() {
        return (
            <InfiniteScroll
                pageSize={10}
                loadData={this.handleLoadMore}
                onDataLoaded={this.handleNewUsers}
            >
                <div>
                    {this.state.followedUsers.map(user => <UserBrief key={user.userId} {...user} />)}
                </div>
            </InfiniteScroll>
        );
    }

}
