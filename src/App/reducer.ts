import { Store } from '../mainReducer';
import { AsyncFetchRegions } from './actions';

const regions = (
    state: Store['regions'] = [],
    action: AsyncFetchRegions
): Store['regions'] => {
    switch (action.type) {
        case 'FETCH_REGIONS_FULFILLED':
            return action.payload;
        case 'FETCH_REGIONS_REJECTED':
            throw action.payload;
        default:
            return state;
    }
};

export default regions;