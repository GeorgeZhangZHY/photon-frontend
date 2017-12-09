import * as React from 'react';
import AlbumFeed from './AlbumFeed';
import { requestUserAlbums } from '../../netAccess/albums';

type Props = {
    userId: number
};

export default function UserAlbumFeed({ userId }: Props) {
    const requestAlbum = (pageNum: number, pageSize: number) => requestUserAlbums(userId, pageNum, pageSize);
    return <AlbumFeed onLoadMore={requestAlbum} />;
}