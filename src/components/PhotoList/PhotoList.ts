import { connect, Dispatch } from 'react-redux';
import { DispatchProps, PhotoListComponent, OwnProps } from './component';
import { enterImageView } from './actions';

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    handleEnterImageView: (photoUrls: string[], initialIndex: number) =>
        dispatch(enterImageView(photoUrls, initialIndex))
});

const PhotoList = connect<undefined, DispatchProps, OwnProps>(undefined, mapDispatchToProps)(PhotoListComponent);

export default PhotoList;