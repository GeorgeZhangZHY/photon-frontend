import { requestRegions } from '../../netAccess/regions';
import { requestIdentities } from '../../netAccess/identities';
import { requestCostOptions } from '../../netAccess/costOptions';
import { requestGenders } from '../../netAccess/genders';
import { Region } from '../../global/models';
import { requestTags } from '../../netAccess/tags';

export type FetchConstantsAction = {
    type: string,
    payload?: Region[] | string[] | Error 
};

export const fetchRegions = () => ({
    type: 'FETCH_REGIONS',
    payload: requestRegions()
});

export const fetchIdentities = () => ({
    type: 'FETCH_IDENTITIES',
    payload: requestIdentities()
});

export const fetchCostOptions = () => ({
    type: 'FETCH_COST_OPTIONS',
    payload: requestCostOptions()
});

export const fetchGenders = () => ({
    type: 'FETCH_GENDERS',
    payload: requestGenders()
});

export const fetchTags = () => ({
    type: 'FETCH_TAGS',
    payload: requestTags()
});