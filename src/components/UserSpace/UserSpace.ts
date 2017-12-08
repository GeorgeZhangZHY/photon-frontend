import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { UserSpaceComponent, StateProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    currentUser: state.currentUser,
    watchingUser: state.watchingUser
});

const UserSpace = connect<StateProps>(mapStateToProps)(UserSpaceComponent);

export default UserSpace;