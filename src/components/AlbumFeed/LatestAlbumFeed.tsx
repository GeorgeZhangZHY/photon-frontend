import * as React from 'react';
import AlbumFeed from './AlbumFeed';
import { requestLatestAlbums } from '../../netAccess/albums';

export default function LatestAlbumFeed() {
    return <AlbumFeed onLoadMore={requestLatestAlbums} />;
}