import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { MessagePaneComponent, StateProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    currentUser: state.currentUser
});

const MessagePane = connect<StateProps>(mapStateToProps)(MessagePaneComponent);

export default MessagePane;