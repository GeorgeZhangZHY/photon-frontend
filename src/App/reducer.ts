import { Store, Option } from '../mainReducer';
import { AsyncFetchAction } from './actions';

export const regions = (
    state: Store['regions'] = [{ code: 0, name: '全部' }],
    action: AsyncFetchAction
): Store['regions'] => {
    switch (action.type) {
        case 'FETCH_REGIONS_FULFILLED':
            return state.concat(<Option[]> action.payload);
        default:
            return state;
    }
};

export const costOptions = (
    state: Store['costOptions'] = [{ code: 0, name: '全部' }],
    action: AsyncFetchAction
): Store['costOptions'] => {
    switch (action.type) {
        case 'FETCH_COST_OPTIONS_FULFILLED':
            return state.concat(<Option[]> action.payload);
        default:
            return state;
    }
};

export const identities = (
    state: Store['identities'] = [{ code: 0, name: '全部' }],
    action: AsyncFetchAction
): Store['identities'] => {
    switch (action.type) {
        case 'FETCH_IDENTITIES_FULFILLED':
            return state.concat(<Option[]> action.payload);
        default:
            return state;
    }
};

export const genders = (
    state: Store['genders'] = [{ code: 0, name: '全部' }],
    action: AsyncFetchAction
): Store['genders'] => {
    switch (action.type) {
        case 'FETCH_GENDERS_FULFILLED':
            return state.concat(<Option[]> action.payload);
        default:
            return state;
    }
};