import { Store } from '../../global/mainReducer';
import { Region } from '../../global/models';
import { FetchConstantsAction } from './actions';

export const regions = (
    state: Store['regions'] = [{ regionCode: 0, regionName: '全部' }],
    action: FetchConstantsAction
): Store['regions'] => {
    switch (action.type) {
        case 'FETCH_REGIONS_FULFILLED':
            return state.concat(<Region[]>action.payload);
        default:
            return state;
    }
};

export const costOptions = (
    state: Store['costOptions'] = ['全部'],
    action: FetchConstantsAction
): Store['costOptions'] => {
    switch (action.type) {
        case 'FETCH_COST_OPTIONS_FULFILLED':
            return state.concat(<string[]>action.payload);
        default:
            return state;
    }
};

export const identities = (
    state: Store['identities'] = ['全部'],
    action: FetchConstantsAction
): Store['identities'] => {
    switch (action.type) {
        case 'FETCH_IDENTITIES_FULFILLED':
            return state.concat(<string[]>action.payload);
        default:
            return state;
    }
};

export const genders = (
    state: Store['genders'] = ['全部'],
    action: FetchConstantsAction
): Store['genders'] => {
    switch (action.type) {
        case 'FETCH_GENDERS_FULFILLED':
            return state.concat(<string[]>action.payload);
        default:
            return state;
    }
};

export const tags = (
    state: Store['tags'] = ['全部'],
    action: FetchConstantsAction
): Store['genders'] => {
    switch (action.type) {
        case 'FETCH_TAGS_FULFILLED':
            return state.concat(<string[]>action.payload);
        default:
            return state;
    }
};