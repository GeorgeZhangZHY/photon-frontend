import { getData } from './utils';

export const requestGenders = () => (
    getData('/genders').then(values => (<any[]>values).map(value => <string>value.gender))
);