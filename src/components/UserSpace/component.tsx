import * as React from 'react';
import { User, UserBriefInfo, RouteProps } from '../../global/models';
import { genderLogos, handleFollow, defaultAvatar } from '../UserBrief/component';
import { AxiosPromise } from 'axios';
import { Link } from 'react-router-dom';
import { checkFollow } from '../../netAccess/follows';
import { Switch, Route } from 'react-router';
import UserActivityFeed from '../ActivityFeed/UserActivityFeed';
import UserPostFeed from '../UserPostFeed/UserPostFeed';
import UserAlbumFeed from '../AlbumFeed/UserAlbumFeed';
import LikedAlbumFeed from '../AlbumFeed/LikedAlbumFeed';
import FollowedUserFeed from '../FollowedUserFeed/FollowedUserFeed';
import './UserSpace.css';

export type StateProps = {
    currentUser: User,
    watchingUser: UserBriefInfo
};

type UserSpaceProps = StateProps & RouteProps<{ userId: string }>;

export class UserSpaceComponent extends React.Component<UserSpaceProps> {

    render() {
        let { currentUser, watchingUser, match } = this.props;
        match = match!;
        const watchingUserId = +match.params.userId;
        const isSelf = currentUser.userId === watchingUserId;
        const user: User | UserBriefInfo = isSelf ? currentUser : watchingUser;
        return (
            <div className="vertical-container centered">
                <UserIntro
                    isSelf={isSelf}
                    currentUserId={currentUser.userId}
                    user={user}
                />
                <section>
                    <div className="control">
                        <Link to={match.url + '/activity'}>动态</Link>
                        <Link to={match.url + '/post'}>约拍</Link>
                        <Link to={match.url + '/album'}>发布的相册</Link>
                        <Link to={match.url + '/liked'}>喜欢的相册</Link>
                        <Link to={match.url + '/follow'}>关注的人</Link>
                    </div>
                    <Switch>
                        <Route
                            path={match.path + '/activity'}
                            render={() => <UserActivityFeed userId={user.userId} />}
                        />
                        <Route
                            path={match.path + '/post'}
                            render={() => <UserPostFeed userId={user.userId} />}
                        />
                        <Route
                            path={match.path + '/album'}
                            render={() => <UserAlbumFeed userId={user.userId} />}
                        />
                        <Route
                            path={match.path + '/liked'}
                            render={() => <LikedAlbumFeed userId={user.userId} />}
                        />
                        <Route
                            path={match.path + '/follow'}
                            render={() => <FollowedUserFeed followerId={user.userId} />}
                        />
                    </Switch>
                </section>
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
        const { showContact, hasFollowed } = this.state;
        let contact = null;
        const backStyle = {
            backgroundImage: `url(${avatarUrl || defaultAvatar[gender]})`,
        };
        if (this.props.isSelf) {
            const { phoneNum, qqNum, wechatId, wechatQRCodeUrl } = this.props.user as User;
            contact = (
                <div className="vertical-container">
                    <span>手机号：{phoneNum || '无'}</span>
                    <span>QQ号：{qqNum || '无'}</span>
                    <span>微信号：{wechatId || '无'}</span>
                    <span>微信二维码：{wechatQRCodeUrl ? <img src={wechatQRCodeUrl} alt="微信二维码" /> : '无'}</span>
                </div>
            );
        }
        return (
            <section className="user-container">
                <div className="user-cover">
                    <div style={backStyle} className="cover-back" />
                </div>
                <div className="info-container">
                    <div
                        style={{ backgroundImage: `url(${avatarUrl || defaultAvatar[gender]})` }}
                        className="avatar-big"
                    />
                    <div className="horizontal-container">
                        <b>{userName}</b>
                        <img src={genderLogos[gender]} alt="性别" className="gender-logo" />
                    </div>
                    <div className="user-info vertical-container">
                        <span>{regionName || '未设置所在地区'} | {identity}</span>
                        {showContact ? contact : null}
                        {this.props.isSelf ?
                            <div className="control-pane">
                                <button onClick={this.toggleContact}>查看联系方式</button>
                                <Link to="/modifyUser">编辑个人资料</Link>
                            </div>
                            : <button
                                onClick={this.toggleFollow}
                                className={hasFollowed ? 'cancel-follow' : 'primary'}
                            >
                                {hasFollowed ? '已关注' : '关注'}
                            </button>
                        }
                    </div>
                </div>
            </section>
        );
    }
}