import * as React from 'react';
import { Activity, Album, Post } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';
import { Link } from 'react-router-dom';
import PhotoList from '../PhotoList/PhotoList';

const action = {
    album: '发布了作品相册',
    post: '发布了约拍'
};

const contentKey = {
    album: 'description',
    post: 'content'
};

const idKey = {
    album: 'albumId',
    post: 'postId'
};

export type DispatchProps = {
    handleEnterAlbumDetail: (album: Album) => void
    handleEnterPostDetail: (post: Post) => void
};

export type OwnProps = Activity;

type Props = DispatchProps & OwnProps;

export class ActivityItemComponent extends React.Component<Props> {

    handleEnterDetail = () => {
        const { handleEnterAlbumDetail, handleEnterPostDetail, type, payload } = this.props;
        if (type === 'album') {
            handleEnterAlbumDetail(payload as Album);
        } else if (type === 'post') {
            handleEnterPostDetail(payload as Post);
        }
    }

    render() {
        const { user, payload, type } = this.props;
        const photoNum = payload.photoUrls.length;
        return (
            <div className="form-item">
                <UserBrief user={user} hideFollow />
                <Link to={`/${type}/${payload[idKey[type]]}`} onClick={this.handleEnterDetail}>
                    <span>{action[type]}</span>
                    <p>{payload[contentKey[type]]}{photoNum > 0 ? `(${photoNum}张)` : null}</p>
                    <PhotoList photoUrls={payload.photoUrls} />
                    <span>{payload.createTime}</span>
                </Link>
            </div>
        );
    }
}