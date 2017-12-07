import * as React from 'react';
import AlbumFeed from './AlbumFeed';
import { requestLikedAlbums } from '../../netAccess/albums';

type Props = {
    userId: number
};

export default function LikedAlbumFeed({ userId }: Props) {
    const requestAlbum = (pageNum: number, pageSize: number) => requestLikedAlbums(userId, pageNum, pageSize);
    return <AlbumFeed onLoadMore={requestAlbum} />;
}