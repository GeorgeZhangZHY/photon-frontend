import { type } from "os";


export type NewPost = {
    ownerId: number,
    requiredRegionCode: number,
    costOption: string,
    cost: number,
    content: string,
    tags: string[],
    photoUrls: string[],   // 对于浏览器端刚上传的图片，为base64编码的dataUrl；对于从服务器发送的图片，则为路径
    themeId: number
};

export type Post = {
    postId: number,
    ownerName: string,
    ownerIdentity: string,
    ownerGender: string,
    ownerAvatarUrl: string,
    launchTime: string,
    isClosed: boolean,
    themeName: string,
    requiredRegionName: string,
    themeCoverUrl: string,
    requestNum: number  // 收到的约拍请求数
} & NewPost;

export type NewAlbum = {
    themeId?: number,
    albumName: string,
    userId: number,
    shotTime: string,
    shotLocation: string,
    shotDevice: string,
    description: string,
    photoUrls: string[],
    tags: string[],
    coverOrdinal: number    // 封面图片对应于其所有图片中的后缀
};

export type Album = {
    albumId: number,
    createTime: string,
    themeName?: string,
    themeCoverUrl?: string
} & NewAlbum;

export type NewComment = {
    userId: number,
    albumId: number,
    content: string
};

export type Comment = UserBriefInfo & NewComment & {
    commentId: number,
    commentTime: string
};

// 用于提醒用户的未读评论通知
export type CommentNotification = UserBriefInfo & NewComment & {
    albumName: string,
    commentTime: string,
    commentId: string,
    hasRead: number
};

export type NewFollow = {
    userId: number,
    followerId: number
};

export type FollowNotification = UserBriefInfo & {
    createTime: string,
    followerId: number
};  // 实际没有userId，只有followerId

export type NewLike = {
    userId: number,
    albumId: number
};

export type Like = NewLike & UserBriefInfo & {
    createTime: string
};

export type LikeNotification = Like & {
    albumName: string
};

export type NewParticipate = {
    albumId: number,
    userId: number
};

export type Status = 'pending' | 'agreed' | 'rejected' | 'succeeded' | 'failed';

export type ParticipateNotification = NewParticipate & UserBriefInfo & {
    albumName: string,
    status: Status,
    createTime: string
};

export type NewRequest = {
    requesterId: number,
    postId: number,
    message: string,
};

export type RequesterInfo = {
    requesterName: string,
    gender: string,
    identity: string,
    avatarUrl: string,
    wechatQRCodeUrl: string,
    wechatId: string,
    qqNum: number,
    phoneNum: number
};

// 他人对该用户发起的约拍请求
export type OthersRequest = {
    hasRead: boolean,
    requestTime: string
} & NewRequest & RequesterInfo;

// 用户自己向他人发起的约拍请求
export type OwnRequest = {
    requestTime: string
} & NewRequest;

export type UserBriefInfo = {
    userId: number,
    userName: string,
    identity: string,
    gender: string,
    regionCode: number,
    regionName: string,
    avatarUrl: string
};

export type User = {
    password?: string,  // 只在注册时有
    wechatId: string,
    qqNum: number,
    phoneNum: string, // node-sqlite3在进行sql转义后，较大的数的长度始终无法匹配数据CHECK约束，改为字符串可解决
    wechatQRCodeUrl: string
} & UserBriefInfo;

export type Region = {
    regionCode: number,
    regionName: string
};

export type Filter = {
    regionCode: number,
    costOption: string,
    identity: string,
    gender: string
};