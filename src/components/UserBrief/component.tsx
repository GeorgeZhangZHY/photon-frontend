import * as React from 'react';
import { UserBriefInfo } from '../../global/models';
import { cancelFollow, addNewFollow, checkFollow } from '../../netAccess/follows';
import { AxiosPromise } from 'axios';
import { Link } from 'react-router-dom';
import './UserBrief.css';

export const genderLogos = {
    '男': require('./male.svg'),
    '女': require('./female.svg')
};

export const defaultAvatar = {
    '男': require('./avatar-man.svg'),
    '女': require('./avatar-woman.svg')
};

export const handleFollow = {
    true: cancelFollow,
    false: addNewFollow
};

export type StateProps = {
    currentUserId: number
};

export type DispatchProps = {
    handleEnterUserSpace: (userId: number) => void
};

export type OwnProps = {
    hideFollow?: boolean,
    user: UserBriefInfo
};

type Props = StateProps & DispatchProps & OwnProps;

type State = {
    hasFollowed: boolean
};

export class UserBriefComponent extends React.Component<Props, State> {

    state: State = {
        hasFollowed: false
    };

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

    handleClick = () => {
        const { user, handleEnterUserSpace } = this.props;
        handleEnterUserSpace(user.userId);
    }

    render() {
        const { currentUserId, hideFollow } = this.props;
        const { avatarUrl, userName, gender, identity, regionName, userId } = this.props.user;
        const { hasFollowed } = this.state;
        const isSelf = userId === currentUserId;
        return (
            <div className="horizontal-container user-brief">
                <Link to={'/user/' + userId} onClick={this.handleClick}>
                    <img src={avatarUrl || defaultAvatar[gender]} alt="头像" className="avatar-small" />
                </Link>
                <div>
                    <Link to={'/user/' + userId} onClick={this.handleClick} className="username">
                        <span>{userName}</span>
                    </Link>
                    <img src={genderLogos[gender]} alt="性别" className="gender-logo" /><br />
                    <span className="other-info">{identity}</span>
                    {regionName && <span className="other-info">{regionName}</span>}
                </div>
                {(isSelf || hideFollow) ?
                    null
                    : <button
                        onClick={this.toggleFollow}
                        className={`user-brief-control ${hasFollowed ? 'cancel-follow' : 'primary'}`}
                    >{hasFollowed ? '已关注' : '关注'}
                    </button>
                }
            </div>
        );
    }

}