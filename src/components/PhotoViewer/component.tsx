import * as React from 'react';
import { RouteProps } from '../../global/models';
import './PhotoViewer.css';

export type StateProps = {
    photoUrls: string[],
    beginIndex: number
};

type Props = StateProps & RouteProps;

type State = {
    currentIndex: number,
    maxIndex: number
};

export class PhotoViewerComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            currentIndex: props.beginIndex,
            maxIndex: props.photoUrls.length - 1
        };
    }

    close = () => {
        this.props.history!.goBack();
    }

    showPrevious = () => {
        this.setState(prevState => ({
            currentIndex: Math.max(prevState.currentIndex - 1, 0)
        }));
    }

    showNext = () => {
        this.setState(prevState => ({
            currentIndex: Math.min(prevState.currentIndex + 1, prevState.maxIndex)
        }));
    }

    render() {
        const { photoUrls } = this.props;
        const { currentIndex, maxIndex } = this.state;
        return (
            <section className="photo-viewer">
                <header className="horizontal-container centered">
                    <button className="photo-switcher" onClick={this.showPrevious}>&lt;</button>
                    第{currentIndex + 1}张，共{maxIndex + 1}张
                    <button className="photo-switcher" onClick={this.showNext}>&gt;</button>
                </header>
                <button className="close" onClick={this.close}>X</button>
                <div
                    className="photo-big"
                    style={{ backgroundImage: `url(${photoUrls[currentIndex]})` }}
                />
            </section>
        );
    }
}
