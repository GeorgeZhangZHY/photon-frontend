import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { PhotoViewerComponent, StateProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    beginIndex: state.photoBeginIndex,
    photoUrls: state.currentPhotos
});

const PhotoViewer = connect<StateProps>(mapStateToProps)(PhotoViewerComponent);

export default PhotoViewer;