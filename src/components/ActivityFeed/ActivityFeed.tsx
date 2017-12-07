import * as React from 'react';
import { Activity } from '../../global/models';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import { ActivityList } from '../ActivityList/ActivityList';

type Props = {
    onLoadMore: (pageNum: number, pageSize: number) => Promise<Activity[]>
};

type State = {
    activities: Activity[]
};

export default class ActivityFeed extends React.Component<Props, State> {

    state: State = {
        activities: []
    };

    handleNewActivities = (newActivities: Activity[]) => {
        this.setState(prevState => ({ posts: prevState.activities.concat(newActivities) }));
    }

    render() {
        return (
            <InfiniteScroll
                loadData={this.props.onLoadMore}
                pageSize={10}
                onDataLoaded={this.handleNewActivities}
            >
                <ActivityList activities={this.state.activities} />
            </InfiniteScroll>
        );
    }
}