import { getData } from './getWithoutParams';

export const requestGenders = () => (
    getData('/genders').then(values => (<any[]>values).map(value => <string>value.gender))
);