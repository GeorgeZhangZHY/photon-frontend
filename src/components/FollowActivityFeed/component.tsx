import * as React from 'react';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import { requestFollowedActivities } from '../../netAccess/activities';

export type StateProps = {
    currentUserId: number
};

type Props = StateProps;

export  class FollowActivityFeedComponent extends React.Component<Props> {

    loadMoreUserActivity = (pageNum: number, pageSize: number) => {
        return requestFollowedActivities(this.props.currentUserId, pageNum, pageSize);
    }

    render() {
        return (
            <ActivityFeed onLoadMore={this.loadMoreUserActivity} />
        );
    }
}