import * as React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';

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

    const { handleEnterDetail } = props;

    return (
        <section>
            <UserBrief
                avatarUrl={ownerAvatarUrl}
                gender={ownerGender}
                userId={ownerId}
                identity={ownerIdentity}
                regionName={''}
                userName={ownerName}
                regionCode={0}
            />
            <Link to={`/post/${postId}`} onClick={() => handleEnterDetail(props.post)}>
                <span>{content}</span>
                <span>{costOption} {cost > 0 ? cost + '元' : ''}</span>
                <div>
                    {photoUrls.slice(0, 3).map(url => <img key={url} src={url} />)}
                </div>
                <span>{requiredRegionName} {createTime}</span>
                {requestNum > 0 ? <span>收到约拍{requestNum}条</span> : null}
            </Link>
        </section>
    );
}