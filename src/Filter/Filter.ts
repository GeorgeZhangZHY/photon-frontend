import { connect, Dispatch } from 'react-redux';
import { Store, Option } from '../mainReducer';
import FilterComponent from './component';
import { setFilter } from './actions';

const getDisplayRegions = (state: Store) => {
    let displayRegions = state.regions.filter(region => region.code.toString().endsWith('0000'));   // 省级区域
    const selectedRegionCode = state.filter.regionCode;
    if (!selectedRegionCode.toString().endsWith('0000')) {
        // 追加显示用户选择的非省级地区
        const selectedRegion = state.regions.find(region => region.code === state.filter.regionCode);
        displayRegions.push(<Option> selectedRegion);
    }
    return displayRegions;
};

const mapStateToProps = (state: Store) => ({
    displayRegions: getDisplayRegions(state),
    costOptions: state.costOptions,
    identities: state.identities,
    genders: state.genders,
    filter: state.filter
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
    handleSelect: (filter: Store['filter']) => {
        dispatch(setFilter(filter));
    },
    handleExtra: () => {
        // todo
    }
});

const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterComponent);

export default Filter;