import { Store } from '../mainReducer';

export type SetFilter = {
    type: 'SET_FILTER',
    newValue: Partial<Store['filter']>
};

export const setFilter = (newValue: SetFilter['newValue']) => ({
    type: 'SET_FILTER',
    newValue
});
