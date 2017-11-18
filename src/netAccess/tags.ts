import { getData } from './getWithoutParams';

export const requestTags = () => (
    getData('/tags').then(values => (<any[]>values).map(value => <string>value.tag))
);