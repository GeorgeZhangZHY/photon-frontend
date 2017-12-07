import * as React from 'react';
import ActivityFeed from './ActivityFeed';
import { requestUserActivities } from '../../netAccess/activities';

type Props = {
    userId: number
};

export default class UserActivityFeed extends React.Component<Props> {

    loadMoreUserActivity = (pageNum: number, pageSize: number) => {
        return requestUserActivities(this.props.userId, pageNum, pageSize);
    }

    render() {
        return (
            <ActivityFeed onLoadMore={this.loadMoreUserActivity} />
        );
    }
}