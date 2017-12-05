import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { AlbumEditComponent, StateProps, OwnProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    album: state.currentAlbum,
    allTags: state.tags
});

const AlbumEdit = connect<StateProps, undefined, OwnProps>(mapStateToProps)(AlbumEditComponent);

export default AlbumEdit;