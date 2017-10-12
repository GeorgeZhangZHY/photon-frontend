import { Store } from '../mainReducer';
import { SetFilter } from './actions';

const filter = (
    state: Store['filter'] = { regionCode: 0, costCode: 0, identityCode: 0, genderCode: 0 },
    action: SetFilter
): Store['filter'] => {
    switch (action.type) {
        case 'SET_FILTER':
            return { ...state, ...(action.newValue) };
        default:
            return state;
    }
};

export default filter;