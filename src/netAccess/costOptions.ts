import { getData } from './getWithoutParams';

export const requestCostOptions = () => (
    getData('/costOptions').then(values => (<any[]>values).map(value => <string>value.costOption))
);