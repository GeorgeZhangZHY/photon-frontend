import { connect, Dispatch } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { FilterComponent, StateProps, DispatchProps } from './component';
import { setFilter } from './actions';

const mapStateToProps = (state: Store): StateProps => ({
    displayRegions: [{ regionCode: 0, regionName: '全部' }, ...state.provinces],
    costOptions: ['全部', ...state.costOptions],
    identities: ['全部', ...state.identities],
    genders: ['全部', ...state.genders],
    filter: state.filter
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    handleSelect: (newValue) => {
        dispatch(setFilter(newValue));
    },
});

const Filter = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(FilterComponent);

export default Filter;