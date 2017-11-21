import axios from 'axios';
import rootUrl from './const';

export function getData<T>(relativeUrl: string, params?: {}) {
    return axios.get(rootUrl + relativeUrl, {
        params
    }).then(response => <T>response.data);
}

export const postData = (relativeUrl: string, body: {}) => (
    axios.post(rootUrl + relativeUrl, body)
);

export const putData = (relativeUrl: string, body: {}) => (
    axios.put(rootUrl + relativeUrl, body)
);

export const deleteData = (relativeUrl: string, params = {}) => (
    axios.delete(rootUrl + relativeUrl, { params })
);