import * as React from 'react';
import { User, UserBriefInfo } from '../../global/models';
import { genderLogos, handleFollow } from '../UserBrief/component';
import { AxiosPromise } from 'axios';
import { match } from 'react-router-dom';
import { checkFollow } from '../../netAccess/follows';

export type StateProps = {
    currentUser: User,
    watchingUser: UserBriefInfo
};

type UserSpaceProps = StateProps & {
    match: match<{ userId: number }>
};

export class UserSpaceComponent extends React.Component<UserSpaceProps> {

    render() {
        const { currentUser, watchingUser } = this.props;
        const isSelf = currentUser.userId === watchingUser.userId;
        const user: User | UserBriefInfo = isSelf ? currentUser : watchingUser;
        return (
            <div>
                <UserIntro
                    isSelf={isSelf}
                    currentUserId={currentUser.userId}
                    user={user}
                />
                
            </div>
        );
    }
}

type UserIntroProps = {
    currentUserId: number
    isSelf: boolean
    user: User | UserBriefInfo // isSelf时为User
};

type UserIntroState = {
    showContact: boolean
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

    componentDidMount() {
        const { user, currentUserId } = this.props;
        checkFollow(user.userId, currentUserId).then(hasFollowed => {
            this.setState({ hasFollowed });
        });
    }

    toggleFollow = () => {
        const { user, currentUserId } = this.props;
        (handleFollow['' + this.state.hasFollowed](user.userId, currentUserId) as AxiosPromise)
            .then(() => this.setState(prevState => ({
                hasFollowed: !prevState.hasFollowed
            })));
    }

    toggleContact = () => {
        this.setState(prevState => ({
            showContact: !prevState.showContact
        }));
    }

    render() {
        const { avatarUrl, gender, identity, regionName, userName } = this.props.user;
        const { showContact } = this.state;
        let contact = null;
        if (this.props.isSelf) {
            const { phoneNum, qqNum, wechatId, wechatQRCodeUrl } = this.props.user as User;
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
                            <button onClick={this.toggleContact}>查看联系方式</button>
                            <button>编辑个人资料</button>
                        </div>
                        : <button onClick={this.toggleFollow}>{this.state.hasFollowed ? '已关注' : '关注'}</button>
                    }
                </div>
            </section>
        );
    }
}