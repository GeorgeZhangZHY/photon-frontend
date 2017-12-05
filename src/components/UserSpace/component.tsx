import * as React from 'react';
import { User, UserBriefInfo } from '../../global/models';
import { genderLogos, handleFollow } from '../UserBrief/component';
import { AxiosPromise } from 'axios';

export type StateProps = {
    user: User
};

type Props = {

}

export class UserSpaceComponent extends React.Component<> {

    render() {

        return (
            
        )
    }
}

type UserIntroProps = {
    currentUserId: number
} & ({
    isSelf: true,
    user: User
} | {
        isSelf: false,
        user: UserBriefInfo
    });

type UserIntroState = {
    showContact: boolean,
    hasFollowed: boolean
};

class UserIntro extends React.Component<UserIntroProps, UserIntroState> {

    constructor(props: UserIntroProps, context?: any) {
        super(props, context);
        this.state = {
            showContact: false,
            hasFollowed: false
        };
    }

    toggleFollow = () => {
        const { user, currentUserId } = this.props;
        (handleFollow['' + this.state.hasFollowed](user.userId, currentUserId) as AxiosPromise)
            .then(() => this.setState(prevState => ({
                hasFollowed: !prevState.hasFollowed
            })));
    }

    render() {
        const { avatarUrl, gender, identity, regionName, userName } = this.props.user;
        const { showContact } = this.state;
        let contact = null;
        if (this.props.isSelf) {
            const { phoneNum, qqNum, wechatId, wechatQRCodeUrl } = this.props.user;
            contact = (
                <div>
                    <span>手机号：{phoneNum ? phoneNum : '无'}</span>
                    <span>QQ号：{qqNum ? qqNum : '无'}</span>
                    <span>微信号：{wechatId ? wechatId : '无'}</span>
                    <span>微信二维码：{wechatQRCodeUrl ? <img src={wechatQRCodeUrl} alt="微信二维码" /> : '无'}</span>
                </div>
            );
        }
        return (
            <section>
                <img src={avatarUrl} alt="背景" className="user-intro-back" />
                <div>
                    <img src={avatarUrl} alt="头像" className="user-avatar" />
                    <b>{userName}</b>
                    <span>{regionName}</span>
                    <span>{identity}</span>
                    <img src={genderLogos[gender]} alt="性别" />
                    {showContact ? contact : null}
                    {this.props.isSelf ?
                        <div className="control-pane">
                            <button onClick={}>查看联系方式</button>
                            <button>编辑个人资料</button>
                        </div>
                        : <button onClick={this.toggleFollow}>{this.state.hasFollowed ? '已关注' : '关注'}</button>
                    }
                </div>
            </section>
        );
    }
}