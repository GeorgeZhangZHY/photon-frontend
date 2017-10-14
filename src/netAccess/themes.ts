import axios from 'axios';
import rootUrl from './const';

export const requestRecommendedThemes = () => (
    axios.get(rootUrl + '/recommendedThemes').then(value => value.data)
);