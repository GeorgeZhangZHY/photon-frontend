import * as React from 'react';
import { Post } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';

export type DispatchProps = {
    
};

export type StateProps = {
    posts: Post[]
};

type PostFeedComponentProps = StateProps & DispatchProps;

export class PostFeedComponent extends React.Component<PostFeedComponentProps> {

    render() {
        return (
            <div>
                {this.props.posts.map(post =>
                    <PostBrief key={post.postId} {...post} />)}
            </div>
        );
    }    
}

type PostBriefProps = Post;

function PostBrief({
    themeName, content, cost, costOption, tags,
    isClosed, launchTime, ownerId, ownerGender,
    ownerName, photoUrls, postId, ownerIdentity,
    requestNum, requiredRegionCode, requiredRegionName,
    themeCoverUrl, themeId, ownerAvatarUrl
 }: PostBriefProps) {

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
            <span>{content}</span>
            <span>{costOption} {cost > 0 ? cost + '元' : ''}</span>
            <div>
                {photoUrls.map(url => <img key={url} src={url} />)}
            </div>
            <span>{requiredRegionName} {launchTime}</span>
            {requestNum > 0 ? <span>收到约拍{requestNum}条</span> : null}
        </section>
    );
}
