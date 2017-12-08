import * as React from 'react';
import { Link } from 'react-router-dom';

export type OwnProps = {
    photoUrls: string[],
    limit?: number
};

export type DispatchProps = {
    handleEnterImageView: (photoUrls: string[], initialIndex: number) => void
};

type Props = OwnProps & DispatchProps;

export class PhotoListComponent extends React.Component<Props> {

    render() {
        const { photoUrls, limit, handleEnterImageView } = this.props;
        let urls = photoUrls;
        if (limit) {
            urls = urls.slice(0, limit);
        }
        return (
            <div>
                {urls.map((url, index) =>
                    <Link key={url} to="/photo" onClick={() => handleEnterImageView(photoUrls, index)}>
                        <img src={url} className="square" />
                    </Link>)}
            </div>
        );
    }
}