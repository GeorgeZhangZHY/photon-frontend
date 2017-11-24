import * as React from 'react';

type ImageUploaderProps = {
    onImageUrlsChange: (imageUrls: string[]) => void,
    initialImageUrls: string[]
};

export class ImageUploader extends React.Component<ImageUploaderProps, {
    imageUrls: string[]  // dataUrl或url
}> {

    input: HTMLInputElement;

    constructor(props: ImageUploaderProps) {
        super(props);
        this.state = {
            imageUrls: props.initialImageUrls
        };
    }

    readImages = () => {
        let fileList = this.input.files;
        let fileArray: File[] = Array.prototype.slice.call(fileList);
        fileArray.forEach(file => {
            let reader = new FileReader();
            reader.onload = () => {
                this.setState(prevState => ({
                    imageUrls: prevState.imageUrls.concat(reader.result as string)
                }));
            };
            reader.readAsDataURL(file);
        });
    }

    removeImage = (index: number) => {
        this.setState(prevState => ({
            imageUrls: prevState.imageUrls.filter((v, i) => i !== index)
        }));
    }

    componentDidUpdate() {
        this.props.onImageUrlsChange(this.state.imageUrls);
    }

    render() {
        return (
            <div>
                {this.state.imageUrls.map((url, index) =>
                    <img key={url} src={url} onClick={() => this.removeImage(index)} />)}
                <input
                    type="file"
                    accept="image/*"
                    ref={input => this.input = input!}
                    onChange={this.readImages}
                />
            </div>
        );
    }

}