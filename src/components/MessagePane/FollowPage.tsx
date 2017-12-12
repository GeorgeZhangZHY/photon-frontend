import * as React from 'react';
import { FollowNotification } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';
import { setFollowRead } from '../../netAccess/follows';

type Props = {
    currentUserId: number,
    follows: FollowNotification[],
    onChange: (modifiedFollows: FollowNotification[]) => void
};

export class FollowPage extends React.PureComponent<Props> {

    handleSetRead = (follow: FollowNotification) => {
        const { onChange, follows, currentUserId } = this.props;
        const { followerId } = follow;
        setFollowRead(currentUserId, followerId).then(() => {
            onChange(follows.filter(f => f.followerId !== followerId));
        });
    }

    render() {
        const { follows } = this.props;
        return (
            <div>
                {follows.map(f =>
                    <div key={f.followerId} className="form-item">
                        <UserBrief
                            hideFollow
                            user={{
                                avatarUrl: f.avatarUrl,
                                gender: f.gender,
                                identity: f.identity,
                                regionCode: f.regionCode,
                                regionName: f.regionName,
                                userId: f.followerId,
                                userName: f.userName
                            }}
                        />
                        <span>关注了您</span><br/>
                        <span>{f.createTime}</span>
                        <button onClick={() => this.handleSetRead(f)}>我知道了</button>
                    </div>)}
            </div>
        );
    }
}
