import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { StateProps, DispatchProps, OwnProps, UserBriefComponent } from './component';
import { Dispatch } from 'redux';
import { fetchUserInfo } from './actions';

const mapStateToProps = (state: Store): StateProps => ({
    currentUserId: state.currentUser.userId
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    handleEnterUserSpace: (userId: number) => dispatch(fetchUserInfo(userId))
});

const UserBrief = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(UserBriefComponent);

export default UserBrief;