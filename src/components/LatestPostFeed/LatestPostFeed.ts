import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { LatestPostFeedComponent, StateProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    filter: state.filter
});

const LatestPostFeed = connect<StateProps>(mapStateToProps)(LatestPostFeedComponent);

export default LatestPostFeed;