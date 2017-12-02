import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { StateProps, OwnProps, PostEditComponent } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    allCostOptions: state.costOptions,
    allRegions: state.regions,
    allTags: state.tags,
    post: state.currentPost,
    provinces: state.provinces
});

const PostEdit = connect<StateProps, undefined, OwnProps>(mapStateToProps)(PostEditComponent);

export default PostEdit;