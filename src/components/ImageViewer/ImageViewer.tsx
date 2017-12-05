import * as React from 'react';
import { withRouter } from 'react-router';
import { RouterProps } from '../../global/models';

type OwnProps = {
    photoUrls: string[],
    beginIndex: number
};

type Props = OwnProps & RouterProps;

type State = {
    currentIndex: number,
    maxIndex: number
};

class PhotoViewer extends React.Component<Props, State> {

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
            <div>
                <header>第{currentIndex + 1}张，共{maxIndex + 1}张</header>
                <button onClick={this.close}>X</button>
                <img src={photoUrls[currentIndex]} alt="照片大图" />
                <button onClick={this.showPrevious}>&lt;</button>
                <button onClick={this.showNext}>&gt;</button>
            </div>
        );
    }
}

export default withRouter(PhotoViewer);