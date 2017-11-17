import { requestRegions } from '../../netAccess/regions';
import { requestIdentities } from '../../netAccess/identities';
import { requestCostOptions } from '../../netAccess/costOptions';
import { requestGenders } from '../../netAccess/genders';
import { Option } from '../../global/models';

export type AsyncFetchAction = {
    type: string,
    payload?: Option[] | Error
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