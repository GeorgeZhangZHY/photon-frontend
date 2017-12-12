import * as React from 'react';
import { CommentNotification } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';
import { setCommentRead } from '../../netAccess/comments';

type Props = {
    comments: CommentNotification[],
    onChange: (modifiedComments: CommentNotification[]) => void
};

export class CommentPage extends React.PureComponent<Props> {

    handleSetRead = (comment: CommentNotification) => {
        const { onChange, comments } = this.props;
        const { commentId } = comment;
        setCommentRead(commentId).then(() => {
            onChange(comments.filter(c => c.commentId !== commentId));
        });
    }

    render() {
        const { comments } = this.props;
        return (
            <div>
                {comments.map(c =>
                    <div key={c.commentId} className="form-item">
                        <UserBrief
                            hideFollow
                            user={{
                                avatarUrl: c.avatarUrl,
                                gender: c.gender,
                                identity: c.identity,
                                regionCode: c.regionCode,
                                regionName: c.regionName,
                                userId: c.userId,
                                userName: c.userName
                            }}
                        />
                        <span>评论了您的相册『{c.albumName}』：</span><br/>
                        <span>{c.content}</span><br/>
                        <span>{c.commentTime}</span><br/>
                        <button onClick={() => this.handleSetRead(c)}>我知道了</button>
                    </div>)}
            </div>
        );
    }
}