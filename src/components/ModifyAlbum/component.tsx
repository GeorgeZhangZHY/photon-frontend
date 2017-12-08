import * as React from 'react';
import AlbumEdit from '../AlbumEdit/AlbumEdit';
import { Album } from '../../global/models';
import { modifyAlbum } from '../../netAccess/albums';

export type DispatchProps = {
    handleModifyAlbum: (modifiedAlbum: Album) => void
};

export class ModifyAlbumComponent extends React.Component<DispatchProps> {

    handleSubmit = (modifiedAlbum: Album) => {
        return modifyAlbum(modifiedAlbum).then(() => this.props.handleModifyAlbum(modifiedAlbum));
    }

    render() {
        return (
            <AlbumEdit title="修改作品相册" onSubmit={this.handleSubmit} />
        );
    }
}