import * as React from 'react';
import { LikeNotification } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';
import { setLikeRead } from '../../netAccess/likes';

type Props = {
    likes: LikeNotification[],
    onChange: (modifiedLikes: LikeNotification[]) => void
};

export class LikePage extends React.PureComponent<Props> {

    handleSetRead = (like: LikeNotification) => {
        const { onChange, likes } = this.props;
        const { userId, albumId } = like;
        setLikeRead(userId, albumId).then(() => {
            onChange(likes.filter(l => !(l.userId === userId && l.albumId === albumId)));
        });
    }

    render() {
        const { likes } = this.props;
        return (
            <div>
                {likes.map(l =>
                    <div key={l.userId + '-' + l.albumId}>
                        <UserBrief
                            hideFollow
                            user={{
                                avatarUrl: l.avatarUrl,
                                gender: l.gender,
                                identity: l.identity,
                                regionCode: l.regionCode,
                                regionName: l.regionName,
                                userId: l.userId,
                                userName: l.userName
                            }}
                        />
                        <span>喜欢了您的相册『{l.albumName}』</span>
                        <span>{l.createTime}</span>
                        <button onClick={() => this.handleSetRead(l)}>我知道了</button>
                    </div>)}
            </div>
        );
    }
}