import axios from 'axios';
import rootUrl from './const';
import { Option } from '../mainReducer';

export const requestGenders = () => (
    axios.get(rootUrl + '/genders')
        .then(value => <Option[]> value.data)
);