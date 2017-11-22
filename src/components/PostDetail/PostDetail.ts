import { connect, Dispatch } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { StateProps, DispatchProps, PostDetailComponent } from './component';
import { addNewRequest, closePost } from './actions';

const mapStateToProps = (state: Store): StateProps => ({
    currentUserId: state.currentUser.userId,
    post: state.currentPost
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    addRequestOnCurrentPost: () => dispatch(addNewRequest()),
    setCurrentPostClosed: () => dispatch(closePost())
});

const PostDetail = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(PostDetailComponent);

export default PostDetail;