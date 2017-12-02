import { getData } from './utils';

export const requestTags = () => (
    getData<{ tag: string }[]>('/tags').then(values => values.map(value => value.tag))
);