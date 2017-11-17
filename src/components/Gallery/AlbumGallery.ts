import { connect, Dispatch } from 'react-redux';
import { Store } from '../mainReducer';
import { GalleryComponent, GalleryComponentProps } from './component';

const mapStateToProps = (state: Store): Partial<GalleryComponentProps> => ({
   // todo 
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
    // todo
});

const AlbumGallery = connect(mapStateToProps, mapDispatchToProps)(GalleryComponent);
export default AlbumGallery;