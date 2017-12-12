import * as React from 'react';
import './ImageUploader.css';

const addLogo = require('./add.svg');

type ImageUploaderProps = {
    onImageUrlsChange: (imageUrls: string[]) => void,
    imageUrls: string[],
    single?: boolean
};

export class ImageUploader extends React.Component<ImageUploaderProps> {

    input: HTMLInputElement;

    readImages = () => {
        const { onImageUrlsChange } = this.props;
        let fileList = this.input.files;
        let fileArray: File[] = Array.prototype.slice.call(fileList);
        fileArray.forEach(file => {
            let reader = new FileReader();
            reader.onload = () => {
                onImageUrlsChange(this.props.imageUrls.concat(reader.result as string));
            };
            reader.readAsDataURL(file);
        });
    }

    removeImage = (index: number) => {
        const { onImageUrlsChange, imageUrls } = this.props;
        onImageUrlsChange(imageUrls.filter((v, i) => i !== index));
    }

    render() {
        const { imageUrls, single } = this.props;
        return (
            <div className="horizontal-container">
                {imageUrls.map((url, index) =>
                    <div
                        className="square"
                        key={url}
                        style={{ backgroundImage: `url(${url})` }}
                        onClick={() => this.removeImage(index)}
                    />)}
                <a
                    style={{ backgroundImage: `url(${addLogo})` }}
                    className="square"
                >
                    <input
                        type="file"
                        accept="image/*"
                        multiple={!single}
                        ref={input => this.input = input!}
                        onChange={this.readImages}
                        style={{ opacity: 0 }}
                        className="square"
                    />
                </a>
            </div>
        );
    }

}