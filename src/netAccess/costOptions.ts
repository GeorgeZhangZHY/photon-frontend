import axios from 'axios';
import rootUrl from './const';
import { Option } from '../mainReducer';

export const requestCostOptions = () => (
    axios.get(rootUrl + '/costOptions')
        .then(value => <Option[]> value.data)
);