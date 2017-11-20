import { getData } from './utils';

export const requestIdentities = () => (
    getData('/identities').then(values => (<any[]>values).map(value => <string>value.identity))
);