import * as React from 'react';
import ActivityFeed from './ActivityFeed';
import { requestFollowedActivities } from '../../netAccess/activities';

type Props = {
    userId: number
};

export default class FollowActivityFeed extends React.Component<Props> {

    loadMoreUserActivity = (pageNum: number, pageSize: number) => {
        return requestFollowedActivities(this.props.userId, pageNum, pageSize);
    }

    render() {
        return (
            <ActivityFeed onLoadMore={this.loadMoreUserActivity} />
        );
    }
}