import { combineReducers } from 'redux';
import { regions, genders, identities, costOptions } from './App/reducer';
import filter from './Filter/reducer';

export type Option = {
    code: number,
    name: string
};

export type Store = {
    user: {
        username: string,
        id: number,
        token: string
    },
    filter: {
        regionCode: number,
        costCode: number,
        identityCode: number,
        genderCode: number
    },
    recommendedThemes: {
        title: string,
        coverUrl: string,
        themeId: number
    }[],
    newAlbums: {
        title: string,
        coverUrl: string,
        albumId: number
    }[],
    posts: {},
    costOptions: Option[],
    regions: Option[],  // 所有地区
    identities: Option[],
    genders: Option[]
};

export default combineReducers({
    filter, regions, costOptions, identities, genders
});
