import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { modifyAlbum } from './actions';
import { Album } from '../../global/models';
import { DispatchProps, ModifyAlbumComponent } from './component';

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    handleModifyAlbum: (modifiedAlbum: Album) => dispatch(modifyAlbum(modifiedAlbum))
});

const ModifyAlbum = connect<undefined, DispatchProps>(undefined, mapDispatchToProps)(ModifyAlbumComponent);

export default ModifyAlbum;