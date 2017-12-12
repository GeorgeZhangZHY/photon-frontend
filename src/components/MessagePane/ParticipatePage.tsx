import * as React from 'react';
import { ParticipateNotification } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';
import { setParticipateResultRead } from '../../netAccess/participates';

type Props = {
    currentUserId: number,
    results: ParticipateNotification[]
    onChange: (modifiedResults: ParticipateNotification[]) => void
};

const actions = {
    agreed: '同意',
    rejected: '拒绝'
};

export class ParticipatePage extends React.PureComponent<Props> {

    handleSetRead = (result: ParticipateNotification) => {
        const { onChange, results, currentUserId } = this.props;
        const { albumId, status } = result;
        setParticipateResultRead(albumId, currentUserId, status as any).then(() => {
            onChange(results.filter(res => res.albumId !== albumId));
        });
    }

    render() {
        const { results } = this.props;
        return (
            <div>
                {results.map(res =>
                    <div key={res.albumId} className="form-item">
                        <UserBrief
                            hideFollow
                            user={{
                                avatarUrl: res.avatarUrl,
                                gender: res.gender,
                                identity: res.identity,
                                regionCode: res.regionCode,
                                regionName: res.regionName,
                                userId: res.userId,
                                userName: res.userName
                            }}
                        />
                        <span><b>{actions[res.status]}</b>将您加入相册『{res.albumName}』的参与者</span><br/>
                        <span>{res.createTime}</span>
                        <button onClick={() => this.handleSetRead(res)}>我知道了</button>
                    </div>)}
            </div>
        );
    }
}