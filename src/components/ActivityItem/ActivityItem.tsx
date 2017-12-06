import * as React from 'react';
import { Activity } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';

type Props = Activity;

const action = {
    album: '发布了作品相册',
    post: '发布了约拍'
};

const contentKey = {
    album: 'description',
    post: 'content'
};

export class ActivityItem extends React.Component<Props> {

    render() {
        const { user, payload, type } = this.props;
        const photoNum = payload.photoUrls.length;
        return (
            <div>
                <UserBrief {...user} hideFollow />
                <span>{action[type]}</span>
                <p>{payload[contentKey[type]]}{photoNum > 0 ? `(${photoNum}张)` : null}</p>
                {payload.photoUrls.slice(0, 3).map(url =>
                    <img key={url} src={url} />)}
                <span>{payload.createTime}</span>
            </div>
        );
    }
}