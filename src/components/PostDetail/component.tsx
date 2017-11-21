import * as React from 'react';
import { Post } from '../../global/models';
import UserBrief from '../UserBrief/UserBrief';
import Dialog from '../Models/Dialog';
import { addNewRequest, checkHasRequested } from '../../netAccess/request';
import { ChangeEvent } from 'react';

export type DispatchProps = {
    handleClosePost: (postId: number) => void,
    handleAddNewRequest: (userId: number, postId: number, message: string) => void
};

export type StateProps = {
    currentUserId: number
};

export type OwnProps = Post;

type PostDetailComponentProps = DispatchProps & StateProps & OwnProps;

export class PostDetailComponent extends React.Component<PostDetailComponentProps, {
    showDialog: boolean,
    message: string,
    hasRequested: boolean
}> {

    constructor(props: PostDetailComponentProps) {
        super(props);
        this.state = {
            showDialog: false,
            hasRequested: false,
            message: ''
        };
        this.handleRequestConfirm = this.handleRequestConfirm.bind(this);
        this.handleRequestCancel = this.handleRequestCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showRequestDialog = this.showRequestDialog.bind(this);
    }

    componentDidMount() {
        const { postId, currentUserId } = this.props;
        checkHasRequested(currentUserId, postId).then(hasRequested => {
            this.setState({ hasRequested });
        });
    }

    showRequestDialog() {
        this.setState({ showDialog: true });
    }

    handleRequestConfirm() {
        let { message } = this.state;
        let { currentUserId, postId } = this.props;
        this.setState({
            showDialog: false,
            message: ''
        });
        addNewRequest(currentUserId, postId, message).then(() => {
            this.setState({ hasRequested: true });
        });
    }

    handleRequestCancel() {
        this.setState({
            showDialog: false,
            message: ''
        });
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ message: event.target.value });
        event.preventDefault();
    }

    render() {

        const {
            content, cost, costOption, handleAddNewRequest, handleClosePost, isClosed,
            launchTime, ownerAvatarUrl, ownerGender, ownerId, ownerIdentity, ownerName,
            photoUrls, postId, requestNum, requiredRegionCode, requiredRegionName, tags,
            themeCoverUrl, themeId, themeName, currentUserId
        } = this.props;

        const { message, showDialog, hasRequested } = this.state;

        let operations;
        if (ownerId === currentUserId) {
            const lessThan5Min = (new Date().getTime() - new Date(launchTime).getTime()) / 1000 / 60 < 5;
            operations = (
                <div>
                    {lessThan5Min ? <button>编辑</button> : null}
                    {isClosed ? null : <button>关闭帖子</button>}
                </div>
            );
        } else {
            operations = hasRequested ?
                <button>已经约拍</button>
                : <button onClick={this.showRequestDialog}>我要约拍TA</button>;
        }

        return (
            <div>
                <section>
                    <UserBrief
                        avatarUrl={ownerAvatarUrl}
                        gender={ownerGender}
                        identity={ownerIdentity}
                        regionCode={0}
                        regionName={''}
                        userId={ownerId}
                        userName={ownerName}
                    />
                    <table>
                        <tr>
                            <th>面向地区</th>
                            <th>费用</th>
                            <th>发布时间</th>
                        </tr>
                        <tr>
                            <td>{requiredRegionName}</td>
                            <td>{costOption + costOption === '需要收费' || costOption === '愿意付费' ? ` ${cost}元` : ''}</td>
                            <td>{launchTime}</td>
                        </tr>
                    </table>
                    <p>{content}</p>
                    <ul>
                        {tags.map(tag => <li key={tag}>{tag}</li>)}
                    </ul>
                    {requestNum > 0 ? <span>收到约拍{requestNum}条</span> : null}
                    {operations}
                </section>
                {showDialog ?
                    <Dialog
                        title="我要约拍TA"
                        onCancel={this.handleRequestCancel}
                        onConfirm={this.handleRequestConfirm}
                    >
                        <label>
                            约拍留言（必填）
                            <input
                                type="text"
                                value={message}
                                onChange={this.handleChange}
                                placeholder="例如拍摄时间、地点、要求等"
                            />
                        </label>
                    </Dialog>
                    : null
                }
            </div>
        );

    }
}