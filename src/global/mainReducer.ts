import { combineReducers } from 'redux';
import { regions, genders, identities, costOptions, tags } from '../components/App/reducer';
import filter from '../components/Filter/reducer';
import { Region, Post, User, UserBriefInfo } from './models';

export type Store = {
    currentUser: User,  // 当前登录的用户
    watchingUser: UserBriefInfo  // 正在查看的其他用户 
    filter: {
        regionCode: number,
        costOption: string,
        identity: string,
        gender: string
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
    posts: Post[],
    costOptions: string[],
    regions: Region[],  // 所有地区
    identities: string[],
    genders: string[],
    tags: string[]
};

export default combineReducers({
    filter, regions, costOptions, identities, genders, tags
});
