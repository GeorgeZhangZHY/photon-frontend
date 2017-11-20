import * as React from 'react';
import { UserBriefInfo } from '../../global/models';
import { cancelFollow, addNewFollow, checkFollow } from '../../netAccess/follow';
import { AxiosPromise } from 'axios';
import { Link } from 'react-router-dom';

const genderLogos = {
    '男': require('./male.svg'),
    '女': require('./female.svg')
};

export type StateProps = {
    currentUserId: number
};

export type OwnProps = UserBriefInfo;

type UserBriefComponentProps = StateProps & OwnProps;

export class UserBriefComponent extends React.Component<UserBriefComponentProps, { hasFollowed: boolean }> {

    constructor(props: UserBriefComponentProps) {
        super(props);
        this.state = {
            hasFollowed: false
        };
        this.toggleFollow = this.toggleFollow.bind(this);
    }

    componentDidMount() {
        const { userId, currentUserId } = this.props;
        checkFollow(userId, currentUserId).then(hasFollowed => {
            this.setState({ hasFollowed });
        });
    }

    toggleFollow() {
        const handle = {
            true: cancelFollow,
            false: addNewFollow
        };
        const { userId, currentUserId } = this.props;

        (handle['' + this.state.hasFollowed](userId, currentUserId) as AxiosPromise)
            .then(() => this.setState(prevState => ({
                hasFollowed: !prevState.hasFollowed
            })));
    }

    render() {
        const { avatarUrl, userName, gender, identity, regionName, userId, currentUserId } = this.props;

        return (
            <div>
                <Link to={userId === currentUserId ? '/user/me' : '/user/' + userId}>
                    <img src={avatarUrl} alt="头像" />
                    <span>{userName}</span>
                </Link>
                <img src={genderLogos[gender]} alt="性别" />
                <span>{identity}</span>
                {regionName && <span>{regionName}</span>}
                <button onClick={this.toggleFollow}>{this.state.hasFollowed ? '已关注' : '关注'}</button>
            </div>
        );
    }

}