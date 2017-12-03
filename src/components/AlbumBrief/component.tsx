import * as React from 'react';
import { Album } from '../../global/models';
import { Link } from 'react-router-dom';

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
            <div>
                <Link to={`/album/${albumId}`} onClick={() => handleEnterDetail(album)}>
                    <img src={coverUrl} alt={albumName} />
                </Link>
                <span>{albumName} ({photoUrls.length}张)</span>
                <span>{createTime}创建</span>
                <span>{shotLocation}</span>
            </div>
        );
    }
}