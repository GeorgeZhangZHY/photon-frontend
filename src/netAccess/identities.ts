import { getData } from './utils';

export const requestIdentities = () => (
    getData<{ identity: string }[]>('/identities').then(values => values.map(value => value.identity))
);