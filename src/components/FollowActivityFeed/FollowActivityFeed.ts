import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { FollowActivityFeedComponent, StateProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    currentUserId: state.currentUser.userId
});

const FollowActivityFeed = connect<StateProps>(mapStateToProps)(FollowActivityFeedComponent);

export default FollowActivityFeed;