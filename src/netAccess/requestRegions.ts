import axios from 'axios';
import rootUrl from './const';
import { Option } from '../mainReducer';

export const requestRegions = () => (
    axios.get(rootUrl + '/regions').then(value => <Option[]> value.data)
);