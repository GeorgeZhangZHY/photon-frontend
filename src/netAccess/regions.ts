import { getData } from './getWithoutParams';
import { Region } from '../global/models';

export const requestRegions = () => <Promise<Region[]>>getData('/regions');