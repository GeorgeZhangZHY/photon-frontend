import axios from 'axios';
import rootUrl from './const';
import { Option } from '../mainReducer';

export const requestIdentities = () => (
    axios.get(rootUrl + '/identities')
        .then(value => <Option[]> value.data)
);