import * as React from 'react';
import AlbumEdit from '../AlbumEdit/AlbumEdit';
import { Album, NewAlbum } from '../../global/models';
import { addNewAlbum } from '../../netAccess/albums';

export class AddAlbum extends React.Component {

    handleSubmit = (album: Album) => {
        let newAlbum = { ...album };
        delete newAlbum.albumId;
        delete newAlbum.createTime;
        return addNewAlbum(newAlbum as NewAlbum);
    }

    render() {
        return (
            <AlbumEdit title="发布作品相册" onSubmit={this.handleSubmit} />
        );
    }
}