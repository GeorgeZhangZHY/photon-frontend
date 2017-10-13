import { requestRegions } from '../netAccess/requestRegions';
import { Option } from '../mainReducer';

export type AsyncFetchRegions =
    {
        type: 'FETCH_REGIONS_PENDING'
    } | {
        type: 'FETCH_REGIONS_FULFILLED',
        payload: Option[]
    } | {
        type: 'FETCH_REGIONS_REJECTED',
        payload: Error
    };

export const fetchRegions = () => ({
    type: 'FETCH_REGIONS',
    payload: requestRegions()
});