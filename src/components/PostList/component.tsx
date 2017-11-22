import * as React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';

export type DispatchProps = {
    handleEnterDetail: (post: Post) => void
};

export type OwnProps = {
    posts: Post[]
};

type PostListComponentProps = DispatchProps & OwnProps;

export class PostListComponent extends React.Component<PostListComponentProps> {
    render() {
        return (
            <div>
                {this.props.posts.map(post =>
                    <PostBrief
                        key={post.postId}
                        handleEnterDetail={this.props.handleEnterDetail}
                        post={post}
                    />)}
            </div>
        );
    }
}

type PostBriefProps = {
    post: Post
} & DispatchProps;

function PostBrief(props: PostBriefProps) {

    const {
        content, cost, costOption,
        launchTime, ownerId, ownerGender,
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
                    {photoUrls.map(url => <img key={url} src={url} />)}
                </div>
                <span>{requiredRegionName} {launchTime}</span>
                {requestNum > 0 ? <span>收到约拍{requestNum}条</span> : null}
            </Link>
        </section>
    );
}
