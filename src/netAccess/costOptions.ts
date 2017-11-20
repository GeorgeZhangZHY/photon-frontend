import { getData } from './utils';

export const requestCostOptions = () => (
    getData('/costOptions').then(values => (<any[]>values).map(value => <string>value.costOption))
);