import { connect } from 'react-redux';
import { AddAlbumComponent, StateProps } from './component';
import { Store } from '../../global/mainReducer';

const mapState = (state: Store): StateProps => ({
    currentUserId: state.currentUser.userId
});

const AddAlbum = connect<StateProps>(mapState)(AddAlbumComponent);

export default AddAlbum;