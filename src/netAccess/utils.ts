import axios from 'axios';

const rootUrl = 'http://localhost:8080';

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