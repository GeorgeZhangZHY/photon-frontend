import * as React from 'react';
import { Activity } from '../../global/models';
import ActivityItem from '../ActivityItem/ActivityItem';

type Props = {
    activities: Activity[]
};

export class ActivityList extends React.Component<Props> {

    render() {
        const { activities } = this.props;
        return (
            <div>
                {activities.map(ac =>
                    <ActivityItem
                        key={ac.payload.createTime}
                        {...ac}
                    />)}
            </div>
        );

    }
}