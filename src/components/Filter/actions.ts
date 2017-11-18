import { Store } from '../../global/mainReducer';

export type SetFilterAction = {
    type: 'SET_FILTER',
    newValue: Partial<Store['filter']>
};

export const setFilter = (newValue: SetFilterAction['newValue']) => ({
    type: 'SET_FILTER',
    newValue
});
