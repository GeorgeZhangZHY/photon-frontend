import { connect, Dispatch } from 'react-redux';
import { ActivityItemComponent, DispatchProps, OwnProps } from './component';
import { Album, Post } from '../../global/models';
import { enterAlbumDetail } from '../AlbumBrief/actions';
import { enterPostDetail } from '../PostList/actions';

const mapDispactchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    handleEnterAlbumDetail: (album: Album) => dispatch(enterAlbumDetail(album)),
    handleEnterPostDetail: (post: Post) => dispatch(enterPostDetail(post))
});

const ActivityItem = connect<undefined, DispatchProps, OwnProps>(undefined, mapDispactchToProps)(ActivityItemComponent);

export default ActivityItem;