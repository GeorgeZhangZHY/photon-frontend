import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { StateProps, OwnProps, PostEditComponent } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    allCostOptions: state.costOptions,
    allTags: state.tags,
    post: state.currentPost
});

const PostEdit = connect<StateProps, undefined, OwnProps>(mapStateToProps)(PostEditComponent);

export default PostEdit;