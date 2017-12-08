import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { StateProps, DispatchProps, ModifyUserComponent } from './component';
import { Dispatch } from 'redux';
import { modifyUserInfo } from './actions';
import { User } from '../../global/models';

const mapStateToProps = (state: Store): StateProps => ({
    genders: state.genders,
    identities: state.identities,
    user: state.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    handleModifyUserInfo: (modifiedUser: User) => dispatch(modifyUserInfo(modifiedUser))
});

const ModifyUser = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ModifyUserComponent);

export default ModifyUser;