// import { combineReducers } from 'redux';

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
    recommendedThemes: {},
    newWorks: {},
    posts: {},
    costOptions: Option[],
    regions: Option[],
    identities: Option[],
    genders: Option[]
};
