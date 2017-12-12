import * as React from 'react';
import { Album, RouteProps } from '../../global/models';
import { MultiPicker } from '../MultiPicker/MultiPicker';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import { withRouter } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';

export type StateProps = {
    album: Album,
    allTags: string[]
};

export type OwnProps = {
    title: '发布作品相册' | '修改作品相册',
    onSubmit: (album: Album) => Promise<any>
};

type Props = StateProps & OwnProps & RouteProps;
type State = Album;

class AlbumEdit extends React.Component<Props, State> {

    constructor(props: Props, context?: any) {
        super(props, context);
        const { album } = props;
        this.state = { ...album };
    }

    handleTagChange = (tags: string[]) => {
        this.setState({ tags });
    }

    handleImageUrlsChange = (imageUrls: string[]) => {
        this.setState({ photoUrls: imageUrls });
    }

    handleTextChange = (stateName: keyof State) => {
        return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            this.setState({ [stateName]: event.target.value } as any);
        };
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { onSubmit, history } = this.props;
        onSubmit(this.state).then(() => {
            history!.goBack();
        });
    }

    handleCancel = () => {
        this.props.history!.goBack();
    }

    render() {
        const { title, allTags } = this.props;
        const { albumName, /*coverOrdinal,*/ description, photoUrls,
            shotDevice, shotLocation, shotTime, tags } = this.state;

        return (
            <section className="form-container">
                <header>{title}</header>
                <form onSubmit={this.handleSubmit} className="vertical-container">
                    <div className="form-item">
                        <label data-required>作品名称：</label>
                        <input
                            type="text"
                            name="albumName"
                            maxLength={25}
                            value={albumName}
                            onChange={this.handleTextChange('albumName')}
                            className="full-width"
                        />
                    </div>
                    <div className="form-item">
                        <label>作品描述：</label>
                        <textarea
                            name="description"
                            cols={30}
                            rows={10}
                            onChange={this.handleTextChange('description')}
                            value={description}
                        />
                    </div>
                    <div className="form-item">
                        <label>拍摄地点：</label>
                        <input
                            type="text"
                            name="shotLocation"
                            maxLength={40}
                            value={shotLocation}
                            onChange={this.handleTextChange('shotLocation')}
                            className="full-width"
                        />
                    </div>
                    <div className="form-item">
                        <label>拍摄时间：</label>
                        <input
                            type="text"
                            name="shotTime"
                            maxLength={30}
                            value={shotTime}
                            onChange={this.handleTextChange('shotTime')}
                            className="full-width"
                        />
                    </div>
                    <div className="form-item">
                        <label>使用设备：</label>
                        <input
                            type="text"
                            name="shotDevice"
                            maxLength={30}
                            value={shotDevice}
                            onChange={this.handleTextChange('shotDevice')}
                            className="full-width"
                        />
                    </div>
                    <MultiPicker
                        allItems={allTags}
                        onChange={this.handleTagChange}
                        selectedItems={tags}
                        title="拍摄标签"
                    />
                    <div className="form-item">
                        <label>照片：</label>
                        <ImageUploader
                            imageUrls={photoUrls}
                            onImageUrlsChange={this.handleImageUrlsChange}
                        />
                    </div>
                    <div className="form-item horizontal-container centered">
                        <input type="submit" value="提交" className="primary" />
                        <input type="button" value="取消" onClick={this.handleCancel} />
                    </div>
                </form>
            </section>
        );
    }
}

export const AlbumEditComponent = withRouter(AlbumEdit);