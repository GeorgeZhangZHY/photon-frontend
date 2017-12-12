import * as React from 'react';
import { Album } from '../../global/models';
import { Link } from 'react-router-dom';
import './AlbumBrief.css';

export type DispatchProps = {
    handleEnterDetail: (album: Album) => void
};

export type OwnProps = {
    album: Album
};

type AlbumBriefComponentProps = DispatchProps & OwnProps;

export class AlbumBriefComponent extends React.Component<AlbumBriefComponentProps> {

    render() {
        const { album, handleEnterDetail } = this.props;
        const { albumId, albumName, coverOrdinal, createTime, photoUrls, shotLocation } = album;
        const coverUrl = photoUrls[coverOrdinal];
        return (
            <div className="vertical-container album-brief">
                <Link to={`/album/${albumId}`} onClick={() => handleEnterDetail(album)}>
                    <div style={{ backgroundImage: `url(${coverUrl})` }} className="square huge" />
                </Link>
                <Link to={`/album/${albumId}`} onClick={() => handleEnterDetail(album)}>
                    <span>{albumName} ({photoUrls.length}张)</span>
                </Link>
                <span>{createTime}创建</span>
                <span>{shotLocation}</span>
            </div>
        );
    }
}