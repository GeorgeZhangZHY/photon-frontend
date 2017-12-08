import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { StateProps, OwnProps, RegionSelectComponent } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    allRegions: state.regions,
    provinces: state.provinces,
});

const RegionSelect = connect<StateProps, undefined, OwnProps>(mapStateToProps)(RegionSelectComponent);

export default RegionSelect;