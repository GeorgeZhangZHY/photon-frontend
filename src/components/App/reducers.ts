import { Store } from '../../global/mainReducer';
import { Region } from '../../global/models';
import { FetchConstantsAction } from './actions';

export const regions = (
    state: Store['regions'] = [],
    action: FetchConstantsAction
): Store['regions'] => {
    switch (action.type) {
        case 'FETCH_REGIONS_FULFILLED':
            return <Region[]>action.payload;
        default:
            return state;
    }
};

export const provinces = (
    state: Store['provinces'] = [],
    action: FetchConstantsAction
): Store['provinces'] => {
    switch (action.type) {
        case 'FETCH_REGIONS_FULFILLED':
            return (<Region[]>action.payload).filter(region => region.regionCode.toString().endsWith('0000'));   // 省级区域
        default:
            return state;
    }
};

export const costOptions = (
    state: Store['costOptions'] = [],
    action: FetchConstantsAction
): Store['costOptions'] => {
    switch (action.type) {
        case 'FETCH_COST_OPTIONS_FULFILLED':
            return <string[]>action.payload;
        default:
            return state;
    }
};

export const identities = (
    state: Store['identities'] = [],
    action: FetchConstantsAction
): Store['identities'] => {
    switch (action.type) {
        case 'FETCH_IDENTITIES_FULFILLED':
            return <string[]>action.payload;
        default:
            return state;
    }
};

export const genders = (
    state: Store['genders'] = [],
    action: FetchConstantsAction
): Store['genders'] => {
    switch (action.type) {
        case 'FETCH_GENDERS_FULFILLED':
            return <string[]>action.payload;
        default:
            return state;
    }
};

export const tags = (
    state: Store['tags'] = [],
    action: FetchConstantsAction
): Store['genders'] => {
    switch (action.type) {
        case 'FETCH_TAGS_FULFILLED':
            return <string[]>action.payload;
        default:
            return state;
    }
};