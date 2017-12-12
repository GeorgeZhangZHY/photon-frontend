import * as React from 'react';
import { setRequestRead } from '../../netAccess/requests';
import { OthersRequest } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';

type Props = {
    requests: OthersRequest[],
    currentUserName: string,
    onChange: (modifiedRequests: OthersRequest[]) => void
};

export class RequestPage extends React.PureComponent<Props> {

    handleSetRead = (req: OthersRequest) => {
        const { onChange, requests } = this.props;
        const { requesterId, postId } = req;
        setRequestRead(requesterId, postId).then(() => {
            onChange(requests.filter(request => !(request.requesterId === requesterId && request.postId === postId)));
        });
    }

    render() {
        const { requests, currentUserName } = this.props;
        return (
            <div>
                {requests.map(req =>
                    <div key={req.postId + '-' + req.requesterId} className="form-item">
                        <UserBrief
                            hideFollow
                            user={{
                                avatarUrl: req.avatarUrl,
                                gender: req.gender,
                                identity: req.identity,
                                regionCode: 0,
                                regionName: '',
                                userId: req.requesterId,
                                userName: req.requesterName
                            }}
                        />
                        <span>{req.message}</span><br/>
                        <b>联系方式：</b><br/>
                        <div className="vertical-container requester-contact">
                            <span>手机号：{req.phoneNum || '无'}</span>
                            <span>QQ号：{req.qqNum || '无'}</span>
                            <span>微信号：{req.wechatId || '无'}</span>
                            <span>
                                微信二维码：{req.wechatQRCodeUrl ?
                                    <img src={req.wechatQRCodeUrl} alt="微信二维码" />
                                    : '无'}
                            </span>
                        </div>
                        <div className="original-post">
                            <b>{currentUserName}</b>
                            <span>：{req.postContent}</span>
                        </div>
                        <span>{req.requestTime}</span>
                        <button onClick={() => this.handleSetRead(req)}>我知道了</button>
                    </div>)}
            </div>
        );
    }
}