import * as React from 'react';
import { ParticipateNotification } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';
import { resolveParticipate } from '../../netAccess/participates';

type Props = {
    requests: ParticipateNotification[]
    onChange: (modifiedResults: ParticipateNotification[]) => void
};

export class ParticipateRequestPage extends React.PureComponent<Props> {

    handleResolve = (request: ParticipateNotification, agreed: boolean) => {
        const { onChange, requests } = this.props;
        const { albumId, userId } = request;
        resolveParticipate(albumId, userId, agreed).then(() => {
            onChange(requests.filter(req => !(req.albumId === albumId && req.userId === userId)));
        });
    }

    render() {
        const { requests } = this.props;
        return (
            <div>
                {requests.map(req =>
                    <div key={req.albumId + '-' + req.userId} className="form-item">
                        <UserBrief
                            hideFollow
                            user={{
                                avatarUrl: req.avatarUrl,
                                gender: req.gender,
                                identity: req.identity,
                                regionCode: req.regionCode,
                                regionName: req.regionName,
                                userId: req.userId,
                                userName: req.userName
                            }}
                        />
                        <span>请求加入相册『{req.albumName}』的参与者</span><br />
                        <span>{req.createTime}</span>
                        <button onClick={() => this.handleResolve(req, true)} className="primary">同意</button>
                        <button onClick={() => this.handleResolve(req, false)}>拒绝</button>
                    </div>)}
            </div>
        );
    }
}