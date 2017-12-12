import * as React from 'react';
import { Album, UserBriefInfo, Status, Like, Comment as CommentType } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';
import { requestUserBriefInfo } from '../../netAccess/users';
import { requestParticipants, checkParticipateRequest, addNewParticipateRequest } from '../../netAccess/participates';
import { checkLike, addNewLike, cancelLike, requestLikesOfAlbum } from '../../netAccess/likes';
import { AxiosPromise } from 'axios';
import { Link } from 'react-router-dom';
import { requestCommentsOfAlbum, addNewComment } from '../../netAccess/comments';
import { Comment } from '../Comment/Comment';
import PhotoList from '../PhotoList/PhotoList';
import './AlbumDetail.css';
import Dialog from '../Modals/Dialog';
import { ChangeEvent } from 'react';
import { defaultAvatar } from '../UserBrief/component';

export type StateProps = {
    album: Album,
    currentUserId: number
};

type Props = StateProps;

type State = {
    owner: UserBriefInfo,
    paticipants: UserBriefInfo[],
    hasRequested: boolean,
    status: Status | '',
    hasLiked: boolean,
    likes: Like[],
    comments: CommentType[],
    showDialog: boolean,
    newComment: string
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
                userName: '',
            },
            paticipants: [],
            hasRequested: false,
            status: '',
            hasLiked: false,
            likes: [],
            comments: [],
            showDialog: false,
            newComment: ''
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

    handleCommentCancel = () => {
        this.setState({
            showDialog: false,
            newComment: ''
        });
    }

    handleCommentConfirm = () => {
        const { newComment } = this.state;
        const { currentUserId, album } = this.props;
        addNewComment({
            userId: currentUserId,
            albumId: album.albumId,
            content: newComment
        }).then(() => {
            this.setState({
                showDialog: false,
                newComment: ''
            });
        });
    }

    handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ newComment: event.target.value });
        event.preventDefault();
    }

    render() {
        const { album, currentUserId } = this.props;
        const { owner, hasRequested, paticipants, status, hasLiked,
            likes, comments, showDialog, newComment } = this.state;

        const { albumName, coverOrdinal, createTime,
            description, photoUrls, shotDevice, shotLocation,
            shotTime, tags, userId } = album;

        const albumCoverUrl = photoUrls[coverOrdinal];
        const isOwner = currentUserId === userId;

        return (
            <div className="vertical-container centered">
                <section>
                    <UserBrief user={owner} />
                </section>
                <section className="form-container">
                    <div style={{ backgroundImage: `url(${albumCoverUrl})` }} className="square big" />
                    <span>{albumName} ({photoUrls.length}张)</span>
                    <label>{createTime}创建</label>
                    <span><label>作品描述：</label>{description}</span>
                    <span><label>拍摄地点：</label>{shotLocation}</span>
                    <span><label>拍摄时间：</label>{shotTime}</span>
                    <span><label>使用设备：</label>{shotDevice}</span>
                    <ul>
                        {tags.map(tag => <span className="pick-item" key={tag}>{tag}</span>)}
                    </ul>
                    <div>
                        喜欢这个相册的人：
                        {likes.length > 0 ? likes.map(like =>
                            <Link
                                key={like.userId}
                                to={like.userId === currentUserId ? '/user/me' : '/user/' + like.userId}
                            >
                                <div
                                    style={{ backgroundImage: `url(${like.avatarUrl || defaultAvatar[like.gender]})` }}
                                    className="avatar-small"
                                />
                            </Link>)
                            : '无'}
                    </div>
                    {hasRequested && !isOwner ?
                        <span>{reminder[status]}</span>
                        : <button onClick={this.handleRequestParticipate}>我参与了拍摄</button>}
                    {isOwner ?
                        <div>
                            <Link to="/modifyAlbum">编辑</Link>
                            <button>删除</button>
                        </div>
                        : <button onClick={this.handleToggleLike}>{hasLiked ? '已喜欢' : '喜欢'}</button>}
                </section>
                <section className="form-container">
                    <header>参与人员</header>
                    {paticipants.map(user => <UserBrief key={user.userId} user={user} />)}
                </section>
                <section className="form-container">
                    <header>{photoUrls.length}张照片</header>
                    <PhotoList photoUrls={photoUrls} />
                </section>
                <section className="form-container">
                    <header>{comments.length}人评价</header>
                    {comments.map(comment => <Comment key={comment.commentId} {...comment} />)}
                    <button className="primary" onClick={() => this.setState({ showDialog: true })}>发表评论</button>
                </section>
                {showDialog ?
                    <Dialog
                        title="发表评论"
                        onCancel={this.handleCommentCancel}
                        onConfirm={this.handleCommentConfirm}
                    >
                        <label>
                            评论内容
                            <textarea
                                onChange={this.handleCommentChange}
                                placeholder="请礼貌待人"
                                value={newComment}
                            />
                        </label>
                    </Dialog>
                    : null
                }
            </div>
        );
    }
}