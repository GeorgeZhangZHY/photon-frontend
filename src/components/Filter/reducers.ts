import { Store } from '../../global/mainReducer';
import { SetFilterAction } from './actions';

export const filter = (
    state: Store['filter'] = { regionCode: 0, costOption: '全部', identity: '全部', gender: '全部' },
    action: SetFilterAction
): Store['filter'] => {
    switch (action.type) {
        case 'SET_FILTER':
            return { ...state, ...(action.newValue) };
        default:
            return state;
    }
};
