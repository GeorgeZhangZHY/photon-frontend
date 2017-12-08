import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { AlbumDetailComponent, StateProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    album: state.currentAlbum,
    currentUserId: state.currentUser.userId
});

const AlbumDetail = connect<StateProps, undefined, undefined>(mapStateToProps)(AlbumDetailComponent);

export default AlbumDetail;