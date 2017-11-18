import { getData } from './getWithoutParams';

export const requestIdentities = () => (
    getData('/identities').then(values => (<any[]>values).map(value => <string>value.identity))
);