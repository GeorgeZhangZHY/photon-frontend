import { connect, Dispatch } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { StateProps, DispatchProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    currentUserId: state.currentUser.userId
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    handleAddNewRequest:
});