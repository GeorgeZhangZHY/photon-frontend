import { connect, Dispatch } from 'react-redux';
import { AlbumBriefComponent, DispatchProps, OwnProps } from './component';
import { Album } from '../../global/models';
import { enterAlbumDetail } from './actions';

const mapDispactchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    handleEnterDetail: (album: Album) => dispatch(enterAlbumDetail(album))
});

const AlbumBrief = connect<undefined, DispatchProps, OwnProps>(undefined, mapDispactchToProps)(AlbumBriefComponent);

export default AlbumBrief;