import * as React from 'react';
import { Comment as CommentType } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';

type CommentProps = CommentType;

export class Comment extends React.Component<CommentProps> {
    render() {
        const { commentTime, content } = this.props;
        return (
            <div>
                <UserBrief user={this.props} />
                <p>{content}</p>
                <span>{commentTime}</span>
            </div>
        );
    }
}