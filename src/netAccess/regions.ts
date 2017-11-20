import { getData } from './utils';
import { Region } from '../global/models';

export const requestRegions = () => <Promise<Region[]>>getData('/regions');