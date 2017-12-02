import { getData } from './utils';

export const requestRecommendedThemes = () => (
    getData('/recommendedThemes')
);