import axios from 'axios';
import rootUrl from './const';

export const getData = (relativeUrl: string) => (
    axios.get(rootUrl + relativeUrl)
        .then(value => value.data)
);