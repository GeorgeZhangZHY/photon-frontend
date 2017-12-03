import * as React from 'react';
import { Album, UserBriefInfo, Status, Like, Comment } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';
import { requestUserBriefInfo } from '../../netAccess/users';
import { requestParticipants, checkParticipateRequest, addNewParticipateRequest } from '../../netAccess/participates';
import { checkLike, addNewLike, cancelLike, requestLikesOfAlbum } from '../../netAccess/likes';
import { AxiosPromise } from 'axios';
import { Link } from 'react-router-dom';
import { requestCommentsOfAlbum } from '../../netAccess/comments';

export type StateProps = {
    album: Album,
    currentUserId: number
};

export type DispatchProps = {

};

type Props = StateProps & DispatchProps;

type State = {
    owner: UserBriefInfo,
    paticipants: UserBriefInfo[],
    hasRequested: boolean,
    status: Status | '',
    hasLiked: boolean,
    likes: Like[],
    comments: Comment[]
};

const reminder: {[K in Status]: string} = {
    pending: '您已提交申请，等待相册主人审核',
    agreed: '',
    succeeded: '',
    rejected: '主人已拒绝您的申请',
    failed: '主人已拒绝您的申请'
};

export class AlbumDetailComponent extends React.Component<Props, State> {

    constructor(props: Props, context?: any) {
        super(props, context);
        this.state = {
            owner: {
                avatarUrl: '',
                gender: '',
                identity: '',
                regionCode: 0,
                regionName: '',
                userId: props.album.userId,
                userName: ''
            },
            paticipants: [],
            hasRequested: false,
            status: '',
            hasLiked: false,
            likes: [],
            comments: []
        };
    }

    componentDidMount() {
        const { userId } = this.state.owner;
        const { album, currentUserId } = this.props;
        const albumId = album.albumId;
        requestUserBriefInfo(userId).then(user => this.setState({ owner: user }));
        requestParticipants(albumId).then(users => this.setState({ paticipants: users }));
        checkParticipateRequest(currentUserId, albumId).then(result => this.setState(result as any));
        checkLike(currentUserId, albumId).then(hasLiked => this.setState({ hasLiked }));
        requestLikesOfAlbum(albumId).then(likes => this.setState({ likes }));
        requestCommentsOfAlbum(albumId).then(comments => this.setState({ comments }));
    }

    handleRequestParticipate = () => {
        const { currentUserId, album } = this.props;
        addNewParticipateRequest(album.albumId, currentUserId).then(() => this.setState({ status: 'pending' }));
    }

    handleToggleLike = () => {
        const { hasLiked } = this.state;
        const { albumId } = this.props.album;
        const handle = {
            true: cancelLike,
            false: addNewLike
        };
        (handle['' + hasLiked](this.props.currentUserId, albumId) as AxiosPromise)
            .then(() => this.setState(prevState => ({
                liked: !prevState.hasLiked
            })));

    }

    render() {
        const { album, currentUserId } = this.props;
        const { owner, hasRequested, paticipants, status, hasLiked, likes, comments } = this.state;

        const { albumName, coverOrdinal, createTime,
            description, photoUrls, shotDevice, shotLocation,
            shotTime, tags, /*themeCoverUrl, themeId, themeName,*/ userId } = album;

        const albumCoverUrl = photoUrls[coverOrdinal];
        const isOwner = currentUserId === userId;

        return (
            <div>
                <section>
                    <UserBrief {...owner} />
                </section>
                <section>
                    <img src={albumCoverUrl} alt={albumName} />
                    <span>{albumName} ({photoUrls.length}张)</span>
                    <label>{createTime}创建</label>
                    <span><label>作品描述：</label>{description}</span>
                    <span><label>拍摄地点：</label>{shotLocation}</span>
                    <span><label>拍摄时间：</label>{shotTime}</span>
                    <span><label>使用设备：</label>{shotDevice}</span>
                    <ul>
                        {tags.map(tag => <li key={tag}>{tag}</li>)}
                    </ul>
                    <div>
                        喜欢这个相册的人：
                        {likes.map(like =>
                            <Link
                                key={like.userId}
                                to={like.userId === currentUserId ? '/user/me' : '/user/' + like.userId}
                            >
                                <img src={like.avatarUrl} alt={like.userName} />
                            </Link>)}
                    </div>
                    {hasRequested ?
                        <span>{reminder[status]}</span>
                        : <button onClick={this.handleRequestParticipate}>我参与了拍摄</button>}
                    {isOwner ?
                        <div>
                            <button>编辑</button>
                            <button>删除</button>
                        </div>
                        : <button onClick={this.handleToggleLike}>{hasLiked ? '已喜欢' : '喜欢'}</button>}
                </section>
                <section>
                    <header>参与人员</header>
                    {paticipants.map(user => <UserBrief key={user.userId} {...user} />)}
                </section>
                <section>
                    <header>{photoUrls.length}张照片</header>
                    {photoUrls.map((url, index) =>
                        <img key={index} src={url} onClick={} />)}
                </section>
                <section>
                    <header>{comments.length}人评价</header>
                    {comments.map(comment=><UserBrief />)}
                </section>
            </div>
        );
    }
}