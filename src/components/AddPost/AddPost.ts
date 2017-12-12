import { connect,  } from 'react-redux';
import { AddPostComponent, StateProps } from './component';
import { Store } from '../../global/mainReducer';

const mapState = (state: Store): StateProps => ({
    currentUserId: state.currentUser.userId
});

const AddPost = connect<StateProps>(mapState)(AddPostComponent);

export default AddPost;