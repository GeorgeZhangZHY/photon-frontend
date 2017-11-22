import { connect, Dispatch } from 'react-redux';
import { PostListComponent, DispatchProps, OwnProps } from './component';
import { enterPostDetail } from './actions';
import { Post } from '../../global/models';

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    handleEnterDetail: (post: Post) => dispatch(enterPostDetail(post))
});

const PostList = connect<never, DispatchProps, OwnProps>(undefined, mapDispatchToProps)(PostListComponent);

export default PostList;