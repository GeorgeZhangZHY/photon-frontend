import * as React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';
import PhotoList from '../PhotoList/PhotoList';
import './PostBrief.css';

type PostBriefProps = {
    post: Post
    handleEnterDetail: (post: Post) => void
};

export default function PostBrief(props: PostBriefProps) {

    const {
        content, cost, costOption,
        createTime, ownerId, ownerGender,
        ownerName, photoUrls, postId,
        ownerIdentity, requestNum,
        requiredRegionName, ownerAvatarUrl
    } = props.post;

    const userInfo = {
        avatarUrl: ownerAvatarUrl,
        gender: ownerGender,
        userId: ownerId,
        identity: ownerIdentity,
        regionName: '',
        userName: ownerName,
        regionCode: 0
    };

    const { handleEnterDetail } = props;

    return (
        <section className="vertical-container post-brief">
            <UserBrief user={userInfo} />
            <Link
                to={`/post/${postId}`}
                onClick={() => handleEnterDetail(props.post)}
                className="content"
            >
                {content}
            </Link>
            <PhotoList photoUrls={photoUrls} />
            <span className="other-info">{costOption} {cost > 0 ? cost + '元' : ''}</span>
            {requestNum > 0 ? <span className="other-info">收到约拍{requestNum}条</span> : null}
            <span className="other-info">{requiredRegionName} {createTime}</span>
        </section>
    );
}