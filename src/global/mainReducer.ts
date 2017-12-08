import { combineReducers } from 'redux';
import { regions, genders, identities, costOptions, tags } from '../components/App/reducers';
import filter from '../components/Filter/reducers';
import currentUser from '../components/SignIn/reducers';
import currentPost from '../components/PostDetail/reducers';
import { Region, Post, User, Filter, Album, UserBriefInfo } from './models';

export type Store = {
    currentUser: User,  // 当前登录的用户
    watchingUser: UserBriefInfo, // 查看详情的用户
    currentPost: Post,  // 当前处于查看详情状态下的帖子
    currentAlbum: Album, // 当前处于查看详情状态下的相册
    currentPhotos: string[], // 当前处于查看大图状态下的照片集
    photoBeginIndex: number,    // 查看大图时开始的照片序号
    filter: Filter,
    newAlbums: Album[],
    costOptions: string[],
    regions: Region[],  // 所有地区
    provinces: Region[],
    identities: string[],
    genders: string[],
    tags: string[]
};

export default combineReducers({
    filter, regions, costOptions, identities, genders, tags, currentUser, currentPost
});
