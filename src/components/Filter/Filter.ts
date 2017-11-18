import { connect, Dispatch } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { FilterComponent, FilterComponentProps } from './component';
import { setFilter } from './actions';

const getDisplayRegions = (state: Store) => {
    let displayRegions = state.regions.filter(region => region.regionCode.toString().endsWith('0000'));   // 省级区域
    const selectedRegionCode = state.filter.regionCode;
    if (!selectedRegionCode.toString().endsWith('0000')) {
        // 追加显示用户选择的非省级地区
        const selectedRegion = state.regions.find(region => region.regionCode === state.filter.regionCode);
        if (selectedRegion) {
            displayRegions.push(selectedRegion);
        }
    }
    return displayRegions;
};

const mapStateToProps = (state: Store): Partial<FilterComponentProps> => ({
    displayRegions: getDisplayRegions(state),
    costOptions: state.costOptions,
    identities: state.identities,
    genders: state.genders,
    filter: state.filter
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): Partial<FilterComponentProps> => ({
    handleSelect: (newValue) => {
        dispatch(setFilter(newValue));
    },
    handleExtra: () => {
        // todo
    }
});

const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterComponent);

export default Filter;