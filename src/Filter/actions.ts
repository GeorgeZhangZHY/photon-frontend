import { Store } from '../mainReducer';

export const setFilter = (filter: Store['filter']) => ({
    type: 'SET_FILTER',
    filter
});
