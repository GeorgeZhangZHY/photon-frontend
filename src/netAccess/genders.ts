import { getData } from './utils';

export const requestGenders = () => (
    getData<{ gender: string }[]>('/genders').then(values => values.map(value => value.gender))
);