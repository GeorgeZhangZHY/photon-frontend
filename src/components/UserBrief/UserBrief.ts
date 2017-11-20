import { connect } from 'react-redux';
import { UserBriefComponent, OwnProps } from './component';
import { Store } from '../../global/mainReducer';
import { StateProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    currentUserId: state.currentUser.userId
});

const UserBrief = connect<StateProps, never, OwnProps>(mapStateToProps)(UserBriefComponent);

export default UserBrief;