import * as React from 'react';
import { Album } from '../../global/models';

export type StateProps = {
    album: Album
};

export type DispatchProps = {
    modifyAlbum: (modifiedAlbum: Album) => void
};

export type OwnProps = {
    title: '发布作品相册' | '修改作品相册'
};

type Props = StateProps & DispatchProps & OwnProps;

export class AlbumEditComponent extends React.Component<Props> {

    render() {
        const { album, title } = this.props;
        const { albumId, albumName, coverOrdinal, createTime, description,
            photoUrls, shotDevice, shotLocation, shotTime, tags, userId } = album;

        return (
            <section>
                <header>{title}</header>
                <form onSubmit={}>
                    <div>
                        <label data-required>作品名称：</label>
                        <input type="text" name="albumName" maxLength={25} />
                    </div>
                    <div>
                        <label>作品描述：</label>
                        <textarea name="description" cols={30} rows={10}>{}</textarea>
                    </div>
                    <div>
                        <label>拍摄地点：</label>
                        <input type="text" name="shotLocation" maxLength={40} />
                    </div>
                    <div>
                        <label>拍摄时间：</label>
                        <input type="text" name="shotTime" maxLength={30} />
                    </div>
                    <div>
                        <label>使用设备：</label>
                        <input type="text" name="albumName" maxLength={30} />
                    </div>
                    <div>
                        <label>拍摄标签：</label>
                        {allTags.map(tag =>
                            <span
                                key={tag}
                                onClick={() => this.toggleTag(tag)}
                                className={tags.find(selectedTag => selectedTag === tag) ? 'selected' : ''}
                            >{tag}
                            </span>)}
                    </div>
                </form>
            </section>
        );
    }
}