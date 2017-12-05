import { connect, Dispatch } from 'react-redux';
import { DispatchProps, ModifyPostComponent } from './component';
import { modifyPost } from './actions';
import { Post } from '../../global/models';

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    handleModifyPost: (post: Post) => dispatch(modifyPost(post))
});

const ModifyPost = connect<undefined, DispatchProps, undefined>(undefined, mapDispatchToProps)(ModifyPostComponent);

export default ModifyPost;