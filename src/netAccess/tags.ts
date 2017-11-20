import { getData } from './utils';

export const requestTags = () => (
    getData('/tags').then(values => (<any[]>values).map(value => <string>value.tag))
);