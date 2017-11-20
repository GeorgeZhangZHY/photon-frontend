import { connect, Dispatch } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { PostFeedComponent, DispatchProps, StateProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    posts: state.posts
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
   followUser:  
});