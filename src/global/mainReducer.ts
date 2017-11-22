import { combineReducers } from 'redux';
import { regions, genders, identities, costOptions, tags } from '../components/App/reducer';
import filter from '../components/Filter/reducer';
import currentUser from '../components/SignIn/reducer';
import currentPost from '../components/PostDetail/reducer';
import { Region, Post, User, UserBriefInfo, Filter } from './models';

export type Store = {
    currentUser: User,  // 当前登录的用户
    watchingUser: UserBriefInfo,  // 正在查看的其他用户 
    currentPost: Post,  // 当前处于查看详情状态下的帖子
    filter: Filter,
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
    costOptions: string[],
    regions: Region[],  // 所有地区
    identities: string[],
    genders: string[],
    tags: string[]
};

export default combineReducers({
    filter, regions, costOptions, identities, genders, tags, currentUser, currentPost
});
