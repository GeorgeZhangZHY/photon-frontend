import { combineReducers } from 'redux';
import { composeReducers } from '../utils/reducerUtils';
import { Region, Post, User, Filter, Album, UserBriefInfo } from './models';
import { regions, genders, identities, costOptions, tags, provinces } from '../components/App/reducers';
import { filter } from '../components/Filter/reducers';
import { currentAlbum as currentAlbum1 } from '../components/AlbumBrief/reducers';
import { currentAlbum as currentAlbum2 } from '../components/ModifyAlbum/reducers';
import { currentPost as currentPost1 } from '../components/ModifyPost/reducers';
import { currentUser as currentUser1 } from '../components/ModifyUser/reducers';
import { currentPhotos, photoBeginIndex } from '../components/PhotoList/reducers';
import { currentPost as currentPost2 } from '../components/PostDetail/reducers';
import { currentPost as currentPost3 } from '../components/PostList/reducers';
import { currentUser as currentUser2 } from '../components/SignIn/reducers';
import { watchingUser } from '../components/UserBrief/reducers';

export type Store = {
    currentUser: User,  // 当前登录的用户
    watchingUser: UserBriefInfo, // 查看详情的用户
    currentPost: Post,  // 当前处于查看详情状态下的帖子
    currentAlbum: Album, // 当前处于查看详情状态下的相册
    currentPhotos: string[], // 当前处于查看大图状态下的照片集
    photoBeginIndex: number,    // 查看大图时开始的照片序号
    filter: Filter,
    // newAlbums: Album[],
    costOptions: string[],
    regions: Region[],  // 所有地区
    provinces: Region[],
    identities: string[],
    genders: string[],
    tags: string[]
};

export default combineReducers({
    currentUser: composeReducers(currentUser1, currentUser2),
    watchingUser,
    currentPost: composeReducers(currentPost1, currentPost2, currentPost3),
    currentAlbum: composeReducers(currentAlbum1, currentAlbum2),
    currentPhotos,
    photoBeginIndex,
    filter,
    costOptions,
    regions,
    provinces,
    identities,
    genders,
    tags
});
